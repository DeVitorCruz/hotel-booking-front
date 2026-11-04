import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmService } from '../core/confirm.service';

@Component({
    selector: 'ad-confirm-dialog',
    imports: [FormsModule],
    template: `
        @if (C.CURRENT(); as req) {
            <div class="ad-modal-scrim" (click)="cancel()" (keydown.escape)="cancel()">
                <div class="ad-modal" role="dialog" aria-modal="true" [attr.aria-label]="req.title" (click)="$event.stopPropagation()">
                    <h2>{{ req.title }}</h2>
                    @if (req.message) { <p>{{ req.message }}</p> }
                    @if (req.input || req.checkbox) {
                        <div class="ad-form">
                            @if (req.input) {
                                <div class="ad-field">
                                    <label for="ad-confirm-input">{{ req.input.label }}</label>
                                    <input #field id="ad-confirm-input" class="ad-input" [ngModel]="text()" (ngModelChange)="text.set($event)" (keydown.enter)="ok()" />
                                </div>
                            }
                            @if (req.checkbox) {
                                <label class="ad-check">
                                    <input type="checkbox" [ngModel]="checked()" (ngModelChange)="checked.set($event)" />
                                    {{ req.checkbox.label }}
                                </label>
                            }
                        </div>
                    }
                    <div class="ad-modal__actions">
                        <button type="button" class="ad-btn" (click)="cancel()">Back</button>
                        <button type="button" class="ad-btn" [class.ad-btn--danger-solid]="req.danger" [class.ad-btn--primary]="!req.danger"
                                [disabled]="req.input?.required && !text().trim()" (click)="ok()">
                            {{ req.confirmLabel || 'Confirm' }}
                        </button>
                    </div>
                </div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
    protected readonly C = inject(ConfirmService);
    protected readonly text = signal('');
    protected readonly checked = signal(false);
    private readonly field = viewChild<ElementRef<HTMLInputElement>>('field');

    constructor() {
        effect(() => {
            const REQ = this.C.CURRENT();
            if (!REQ) return;
            this.text.set(REQ.input?.value ?? '');
            this.checked.set(REQ.checkbox?.checked ?? false);
        });
        effect(() => this.field()?.nativeElement.focus());
    }

    protected ok(): void {
        const REQ = this.C.CURRENT();
        if (REQ?.input?.required && !this.text().trim()) return;
        this.C.close({ text: this.text().trim(), checked: this.checked() });
    }

    protected cancel(): void {
        this.C.close(null);
    }
}
