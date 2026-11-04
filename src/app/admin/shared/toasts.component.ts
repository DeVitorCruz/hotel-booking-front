import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../core/toast.service';

@Component({
    selector: 'ad-toasts',
    template: `
        <div class="ad-toasts" aria-live="polite">
            @for (t of T.TOASTS(); track t.id) {
                <div class="ad-toast" [class]="'ad-toast ad-toast--' + t.kind" [attr.role]="t.kind === 'error' ? 'alert' : 'status'">
                    <span class="ad-toast__text">{{ t.text }}</span>
                    <button type="button" aria-label="Dismiss" (click)="T.dismiss(t.id)">×</button>
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsComponent {
    protected readonly T = inject(ToastService);
}
