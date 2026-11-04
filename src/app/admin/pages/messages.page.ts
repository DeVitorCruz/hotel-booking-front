import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AdminApiService } from '../core/admin-api.service';
import { ContactMessage, Paginated } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { StatusBadgeComponent } from '../shared/status-badge.component';

/** Contact-form inbox. Replies are sent from your normal email client. */
@Component({
    selector: 'ad-messages',
    imports: [StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Messages</h1>
                <p>Sent through the website contact form. Reply by email, then mark as replied.</p>
            </div>
        </div>

        <div class="ad-grid ad-grid--2 msg-layout">
            <section class="ad-card">
                <div class="ad-toolbar">
                    <div class="ad-tabs" role="group" aria-label="Filter">
                        @for (f of filters; track f.value) {
                            <button type="button" [class.is-active]="status() === f.value" (click)="setStatus(f.value)">{{ f.label }}</button>
                        }
                    </div>
                </div>
                @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }
                @if (page(); as p) {
                    @if (!p.data.length) { <div class="ad-card__empty">No messages.</div> }
                    <ul class="msg-list">
                        @for (m of p.data; track m.id) {
                            <li>
                                <button type="button" class="msg-item" [class.is-active]="open()?.id === m.id" [class.is-unread]="m.status === 'unread'" (click)="select(m)">
                                    <span class="ad-row" style="justify-content:space-between;flex-wrap:nowrap">
                                        <strong>{{ m.name }}</strong>
                                        <span class="ad-muted nowrap">{{ fmt.dateTime(m.created_at) }}</span>
                                    </span>
                                    <span class="msg-item__subject">{{ m.subject || '(no subject)' }}</span>
                                    <span class="msg-item__preview">{{ m.message }}</span>
                                </button>
                            </li>
                        }
                    </ul>
                    @if (p.last_page > 1) {
                        <div class="ad-pager">
                            <span>Page {{ p.current_page }} of {{ p.last_page }}</span>
                            <span class="ad-row">
                                <button class="ad-btn ad-btn--sm" type="button" [disabled]="p.current_page <= 1" (click)="load(p.current_page - 1)">Previous</button>
                                <button class="ad-btn ad-btn--sm" type="button" [disabled]="p.current_page >= p.last_page" (click)="load(p.current_page + 1)">Next</button>
                            </span>
                        </div>
                    }
                } @else if (!error()) {
                    <div class="ad-card__body"><div class="ad-skeleton" style="height:200px"></div></div>
                }
            </section>

            <section class="ad-card">
                @if (open(); as m) {
                    <div class="ad-card__head">
                        <h2>{{ m.subject || '(no subject)' }}</h2>
                        <ad-status [status]="m.status" />
                    </div>
                    <div class="ad-card__body">
                        <dl class="ad-dl" style="margin-bottom:16px">
                            <dt>From</dt><dd>{{ m.name }} · <a [href]="'mailto:' + m.email">{{ m.email }}</a></dd>
                            <dt>Received</dt><dd>{{ fmt.dateTime(m.created_at) }}</dd>
                        </dl>
                        <p style="white-space:pre-line;line-height:1.65">{{ m.message }}</p>
                        <div class="ad-row" style="margin-top:20px">
                            <a class="ad-btn ad-btn--primary" [href]="replyLink(m)" (click)="markReplied(m)">Reply by email</a>
                            @if (m.status !== 'replied') { <button class="ad-btn" type="button" (click)="setMessageStatus(m, 'replied')">Mark replied</button> }
                            @if (m.status !== 'unread') { <button class="ad-btn" type="button" (click)="setMessageStatus(m, 'unread')">Mark unread</button> }
                            <span class="ad-spacer"></span>
                            <button class="ad-btn ad-btn--danger" type="button" (click)="remove(m)">Delete</button>
                        </div>
                    </div>
                } @else {
                    <div class="ad-card__empty">Select a message to read it.</div>
                }
            </section>
        </div>
    `,
    styles: [`
        .msg-layout { align-items:start; }
        .msg-list { list-style:none; margin:0; padding:0; }
        .msg-item { display:flex; flex-direction:column; gap:2px; width:100%; text-align:left; padding:12px 16px; border:0; border-bottom:1px solid var(--ad-line); background:#fff; cursor:pointer; }
        .msg-item:hover { background:#fbfaf6; }
        .msg-item.is-active { background:#f4f6ee; box-shadow:inset 3px 0 0 var(--ad-brand); }
        .msg-item.is-unread strong::before { content:''; display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--ad-accent); margin-right:7px; vertical-align:middle; }
        .msg-item__subject { font-weight:500; }
        .msg-item__preview { color:var(--ad-muted); font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .nowrap { white-space:nowrap; font-size:12px; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly fmt = ADMIN_FORMAT;
    protected readonly filters = [
        { value: '', label: 'All' }, { value: 'unread', label: 'Unread' },
        { value: 'read', label: 'Read' }, { value: 'replied', label: 'Replied' },
    ];
    protected readonly status = signal('');
    protected readonly page = signal<Paginated<ContactMessage> | null>(null);
    protected readonly open = signal<ContactMessage | null>(null);
    protected readonly error = signal<string | null>(null);

    public ngOnInit(): void {
        this.load(1);
    }

    protected setStatus(s: string): void {
        this.status.set(s);
        this.load(1);
    }

    protected load(n: number): void {
        this.error.set(null);
        this.API.messages(this.status() || undefined, n).subscribe({
            next: p => this.page.set(p),
            error: e => this.error.set(apiErrorMessage(e)),
        });
    }

    protected select(m: ContactMessage): void {
        this.open.set(m);
        if (m.status === 'unread') {
            this.API.message(m.id).subscribe({ next: full => this.replace(full), error: () => {} });
        }
    }

    protected replyLink(m: ContactMessage): string {
        const SUBJECT = encodeURIComponent(`Re: ${m.subject || 'Your message'}`);
        const QUOTE = encodeURIComponent(`\n\n---\n${m.name} wrote:\n${m.message}`);
        return `mailto:${m.email}?subject=${SUBJECT}&body=${QUOTE}`;
    }

    protected markReplied(m: ContactMessage): void {
        if (m.status !== 'replied') this.setMessageStatus(m, 'replied', false);
    }

    protected setMessageStatus(m: ContactMessage, s: ContactMessage['status'], toast = true): void {
        this.API.setMessageStatus(m.id, s).subscribe({
            next: updated => { this.replace({ ...m, ...updated }); if (toast) this.TOAST.success(`Marked ${s}.`); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    protected async remove(m: ContactMessage): Promise<void> {
        if (!await this.CONFIRM.ask({ title: 'Delete this message?', confirmLabel: 'Delete', danger: true })) return;
        this.API.deleteMessage(m.id).subscribe({
            next: () => { this.open.set(null); this.TOAST.success('Message deleted.'); this.load(this.page()?.current_page ?? 1); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    private replace(m: ContactMessage): void {
        this.open.set(m);
        this.page.update(p => p ? { ...p, data: p.data.map(x => x.id === m.id ? m : x) } : p);
    }
}
