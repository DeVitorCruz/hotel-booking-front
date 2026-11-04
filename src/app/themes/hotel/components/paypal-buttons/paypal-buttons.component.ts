import {
    ChangeDetectionStrategy, Component, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender,
    inject, input, output, signal, viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';

/**
 * PayPal Smart Buttons (PayPal account, cards, Pay Later where eligible).
 *
 * The parent owns the server calls:
 *   createOrder → resolves with a PayPal order id created by OUR API
 *   approved    → emitted with the order id; the parent calls our capture endpoint
 */
@Component({
    selector: 'app-paypal-buttons',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (state() === 'loading') { <div class="pp-skeleton hb-skeleton" aria-label="Loading PayPal"></div> }
    @if (state() === 'error') {
        <p class="hb-alert hb-alert--error" role="alert">PayPal could not be loaded. Check your connection, disable blockers for this site, or choose another payment option.</p>
    }
    <div #host class="pp-host" [class.pp-host--hidden]="state() !== 'ready'"></div>
    `,
    styles: [`
    .pp-skeleton { height: 112px; }
    .pp-host { min-height: 48px; position: relative; z-index: 0; }
    .pp-host--hidden { display: none; }
    `],
})
export class PayPalButtonsComponent implements OnDestroy {
    private readonly IS_BROWSER = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly HOST = viewChild.required<ElementRef<HTMLElement>>('host');

    public readonly clientId = input.required<string>();
    public readonly currency = input.required<string>();
    /** Called when the buyer clicks a PayPal button. Reject to abort (e.g. invalid form). */
    public readonly createOrder = input.required<() => Promise<string>>();
    public readonly disabled = input(false);

    public readonly approved = output<string>();
    public readonly cancelled = output<void>();
    public readonly failed = output<unknown>();

    public readonly state = signal<'loading' | 'ready' | 'error'>('loading');
    private buttons?: { close: () => Promise<void> };

    constructor() {
        afterNextRender(() => { void this.render(); });
    }

    public ngOnDestroy(): void {
        void this.buttons?.close().catch(() => undefined);
    }

    private async render(): Promise<void> {
        if (!this.IS_BROWSER) return;

        let paypal: PayPalNamespace | null = null;
        try {
            paypal = await loadScript({
                clientId: this.clientId(),
                currency: this.currency(),
                intent: 'capture',
                components: ['buttons'],
                disableFunding: ['paylater'],
            });
        } catch (e) {
            console.error('[PayPal] SDK failed to load', e); // the error box below explains it to the guest
        }

        if (!paypal?.Buttons) {
            this.state.set('error');
            return;
        }

        const BUTTONS = paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 48 },
            onClick: (_data, actions) => (this.disabled() ? actions.reject() : actions.resolve()),
            createOrder: () => this.createOrder()(),
            onApprove: async (data) => { this.approved.emit(data.orderID); },
            onCancel: () => this.cancelled.emit(),
            onError: (err) => this.failed.emit(err),
        });

        try {
            await BUTTONS.render(this.HOST().nativeElement);
            this.buttons = BUTTONS;
            this.state.set('ready');
        } catch (e) {
            console.error('[PayPal] render failed', e);
            this.state.set('error');
        }
    }
}
