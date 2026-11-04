import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { ToastsComponent } from '../shared/toasts.component';

/**
 * Root of the back office (/admin). Owns the global admin stylesheet,
 * the confirmation dialog and toasts; never indexed by search engines.
 */
@Component({
    selector: 'ad-root',
    imports: [RouterOutlet, ConfirmDialogComponent, ToastsComponent],
    template: `
        <div class="ad-root">
            <router-outlet />
            <ad-confirm-dialog />
            <ad-toasts />
        </div>
    `,
    styleUrl: './admin.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRootComponent {
    constructor() {
        inject(Meta).updateTag({ name: 'robots', content: 'noindex, nofollow' });
        inject(Title).setTitle('Back office');
    }
}
