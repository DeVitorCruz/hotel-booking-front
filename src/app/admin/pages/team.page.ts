import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { AdminApiService } from '../core/admin-api.service';
import { StaffMember, StaffRole } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';

const ROLES: { value: StaffRole; label: string; hint: string }[] = [
    { value: 'receptionist', label: 'Receptionist', hint: 'Bookings, check-in/out, payments, room blocks, messages.' },
    { value: 'editor', label: 'Editor', hint: 'Website content: FAQ, blog, team page, messages.' },
    { value: 'admin', label: 'Admin', hint: 'Everything, including rooms, prices, settings and team.' },
    { value: 'owner', label: 'Owner', hint: 'Like admin; only owners can manage other owners.' },
];

@Component({
    selector: 'ad-team',
    imports: [ReactiveFormsModule],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Team</h1>
                <p>Who can sign in to the back office.</p>
            </div>
        </div>

        <div class="ad-grid ad-grid--side">
            <section class="ad-card">
                @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }
                @if (!loaded()) {
                    <div class="ad-card__body"><div class="ad-skeleton" style="height:160px"></div></div>
                } @else {
                    <div class="ad-table-wrap">
                        <table class="ad-table ad-table--stack">
                            <thead><tr><th>Name</th><th>Role</th><th></th></tr></thead>
                            <tbody>
                                @for (m of members(); track m.id) {
                                    <tr>
                                        <td data-label="Name">
                                            <span class="ad-row" style="flex-wrap:nowrap">
                                                <span class="ad-topbar__avatar" aria-hidden="true">{{ fmt.initials(m.name) }}</span>
                                                <span><strong>{{ m.name }}</strong>@if (m.id === meId) { <span class="ad-muted"> (you)</span> }<br><span class="ad-muted">{{ m.email }}</span></span>
                                            </span>
                                        </td>
                                        <td data-label="Role">
                                            <select class="ad-select" style="width:auto;min-height:32px;padding:4px 8px" [attr.aria-label]="'Role of ' + m.name"
                                                    [value]="m.role" [disabled]="m.id === meId || (m.role === 'owner' && !isOwner)" (change)="changeRole(m, $any($event.target))">
                                                @for (r of roles; track r.value) {
                                                    <option [value]="r.value" [disabled]="r.value === 'owner' && !isOwner">{{ r.label }}</option>
                                                }
                                            </select>
                                        </td>
                                        <td class="actions">
                                            <button class="ad-btn ad-btn--sm" type="button" (click)="resetPassword(m)">Set password</button>
                                            @if (m.id !== meId) {
                                                <button class="ad-btn ad-btn--sm ad-btn--danger" type="button" [disabled]="m.role === 'owner' && !isOwner" (click)="remove(m)">Remove</button>
                                            }
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </section>

            <form class="ad-card" [formGroup]="form" (ngSubmit)="create()" novalidate>
                <div class="ad-card__head"><h2>Add a team member</h2></div>
                <div class="ad-card__body ad-form">
                    <div class="ad-field">
                        <label for="tm-name">Name</label>
                        <input id="tm-name" class="ad-input" formControlName="name" autocomplete="off" />
                    </div>
                    <div class="ad-field">
                        <label for="tm-email">Email</label>
                        <input id="tm-email" class="ad-input" type="email" formControlName="email" autocomplete="off" />
                        @if (err()['email']) { <span class="ad-field__error">{{ err()['email'] }}</span> }
                    </div>
                    <div class="ad-field">
                        <label for="tm-pass">Temporary password</label>
                        <input id="tm-pass" class="ad-input" type="text" formControlName="password" autocomplete="new-password" />
                        <span class="ad-field__hint">At least 8 characters. Share it privately; they can change it later.</span>
                        @if (err()['password']) { <span class="ad-field__error">{{ err()['password'] }}</span> }
                    </div>
                    <div class="ad-field">
                        <label for="tm-role">Role</label>
                        <select id="tm-role" class="ad-select" formControlName="role">
                            @for (r of roles; track r.value) { <option [value]="r.value" [disabled]="r.value === 'owner' && !isOwner">{{ r.label }}</option> }
                        </select>
                        <span class="ad-field__hint">{{ roleHint(form.controls.role.value) }}</span>
                    </div>
                    <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Adding…' : 'Add member' }}</button>
                </div>
            </form>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);
    private readonly AUTH = inject(AuthService);

    protected readonly fmt = ADMIN_FORMAT;
    protected readonly roles = ROLES;
    protected readonly meId = this.AUTH._USER_EFFECT()?.id;
    protected readonly isOwner = (this.AUTH._USER_EFFECT()?.roles ?? []).includes('owner');

    protected readonly members = signal<StaffMember[]>([]);
    protected readonly loaded = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly saving = signal(false);
    protected readonly err = signal<Record<string, string>>({});

    protected readonly form = inject(FormBuilder).nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [this.randomPassword(), [Validators.required, Validators.minLength(8)]],
        role: ['receptionist' as StaffRole],
    });

    public ngOnInit(): void {
        this.load();
    }

    protected roleHint(role: StaffRole): string {
        return ROLES.find(r => r.value === role)?.hint ?? '';
    }

    private load(): void {
        this.API.staff().subscribe({
            next: m => { this.members.set(m); this.loaded.set(true); },
            error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); },
        });
    }

    protected create(): void {
        this.err.set({});
        if (this.form.invalid) { this.form.markAllAsTouched(); this.TOAST.error('Fill in name, email and a password of 8+ characters.'); return; }
        this.saving.set(true);
        this.API.createStaff(this.form.getRawValue()).subscribe({
            next: m => {
                this.saving.set(false);
                this.TOAST.success(`${m.name} can now sign in at /admin.`);
                this.form.reset({ name: '', email: '', password: this.randomPassword(), role: 'receptionist' });
                this.load();
            },
            error: e => { this.saving.set(false); this.err.set(apiFieldErrors(e)); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected changeRole(m: StaffMember, select: HTMLSelectElement): void {
        const ROLE = select.value as StaffRole;
        this.API.updateStaff(m.id, { role: ROLE }).subscribe({
            next: updated => { this.members.update(l => l.map(x => x.id === m.id ? updated : x)); this.TOAST.success(`${m.name} is now ${ROLE}.`); },
            error: e => { select.value = m.role ?? ''; this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async resetPassword(m: StaffMember): Promise<void> {
        const R = await this.CONFIRM.ask({
            title: `New password for ${m.name}`,
            message: m.id === this.meId ? 'Your other sessions will be signed out.' : 'They will be signed out everywhere and must use the new password.',
            input: { label: 'Password (8+ characters)', required: true, value: this.randomPassword() },
            confirmLabel: 'Set password',
        });
        if (!R) return;
        if (R.text.length < 8) { this.TOAST.error('The password needs at least 8 characters.'); return; }
        this.API.updateStaff(m.id, { password: R.text }).subscribe({
            next: () => this.TOAST.success('Password updated.'),
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    protected async remove(m: StaffMember): Promise<void> {
        const OK = await this.CONFIRM.ask({
            title: `Remove ${m.name}?`,
            message: 'They lose back-office access immediately. Their account and booking history are kept.',
            confirmLabel: 'Remove access', danger: true,
        });
        if (!OK) return;
        this.API.removeStaff(m.id).subscribe({
            next: () => { this.TOAST.success(`${m.name} removed.`); this.load(); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    private randomPassword(): string {
        const CHARS = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const BYTES = new Uint32Array(12);
        globalThis.crypto?.getRandomValues?.(BYTES);
        return Array.from(BYTES, b => CHARS[b % CHARS.length]).join('');
    }
}
