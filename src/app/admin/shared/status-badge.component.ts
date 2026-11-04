import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const LABELS: Record<string, string> = {
    pending: 'Awaiting payment', confirmed: 'Confirmed', checked_in: 'In house', checked_out: 'Checked out',
    cancelled: 'Cancelled', expired: 'Expired', no_show: 'No-show',
    paid: 'Paid', failed: 'Failed', refunded: 'Refunded', partially_refunded: 'Part refunded',
    active: 'Active', maintenance: 'Maintenance', inactive: 'Inactive',
    unread: 'Unread', read: 'Read', replied: 'Replied', hidden: 'Hidden',
};

@Component({
    selector: 'ad-status',
    template: `<span [class]="'ad-badge ad-badge--' + status()">{{ label() }}</span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
    public readonly status = input.required<string>();
    protected readonly label = computed(() => LABELS[this.status()] ?? this.status().replace(/_/g, ' '));
}
