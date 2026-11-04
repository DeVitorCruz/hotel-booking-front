import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSideRightBarService } from '@core/services/side-bar/mat-side-right-bar.service';
import { StaySearchComponent } from '../stay-search/stay-search.component';

@Component({
    selector: 'app-sidebar-booking-panel',
    imports: [StaySearchComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="panel">
        <span class="hb-eyebrow">Book direct</span>
        <h2 class="panel__title">Find your room</h2>
        <p class="panel__text">Best rate and free cancellation when you book with us.</p>
        <app-stay-search layout="stacked" (searched)="close()" />
        <p class="panel__foot">Already booked? Use the link in your confirmation email, or <a class="hb-link" routerLink="/contact" (click)="close()">contact us</a>.</p>
    </div>
    `,
    styles: [`
    .panel { padding: 8px 4px 24px; display: flex; flex-direction: column; gap: 12px; }
    .panel__title { margin: 0; font: 700 26px/1.2 var(--hb-serif); color: var(--hb-olive); }
    .panel__text, .panel__foot { margin: 0 0 8px; color: var(--hb-muted); font-size: 14px; line-height: 1.6; }
    .panel__foot { margin-top: 16px; font-size: 13px; }
    `],
})
export class SidebarBookingPanel {
    private readonly SIDEBAR = inject(MatSideRightBarService);
    public close(): void { this.SIDEBAR.closeRightSidebar(); }
}
