import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../core/admin-api.service';
import { Faq } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { StatusBadgeComponent } from '../shared/status-badge.component';

@Component({
    selector: 'ad-faq',
    imports: [ReactiveFormsModule, StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>FAQ</h1>
                <p>Questions shown on the website's FAQ page, in this order.</p>
            </div>
            @if (!editing()) {
                <div class="ad-page-head__actions"><button class="ad-btn ad-btn--primary" type="button" (click)="startNew()">Add question</button></div>
            }
        </div>

        @if (editing(); as e) {
            <form class="ad-card" [formGroup]="form" (ngSubmit)="save()" novalidate style="margin-bottom:16px">
                <div class="ad-card__head"><h2>{{ e === 'new' ? 'New question' : 'Edit question' }}</h2>
                    <label class="ad-check"><input type="checkbox" formControlName="active" /> Shown on website</label>
                </div>
                <div class="ad-card__body ad-form">
                    <div class="ad-field">
                        <label for="faq-q">Question</label>
                        <input id="faq-q" class="ad-input" formControlName="question" />
                    </div>
                    <div class="ad-field">
                        <label for="faq-a">Answer</label>
                        <textarea id="faq-a" class="ad-textarea" rows="4" formControlName="answer"></textarea>
                    </div>
                    <div class="ad-form-grid">
                        <div class="ad-field">
                            <label for="faq-cat">Category <span class="ad-muted">(optional)</span></label>
                            <input id="faq-cat" class="ad-input" formControlName="category" placeholder="Booking, Stay, Payment…" />
                        </div>
                        <div class="ad-field">
                            <label for="faq-order">Position</label>
                            <input id="faq-order" class="ad-input" type="number" min="0" max="255" formControlName="order" />
                        </div>
                    </div>
                    <div class="ad-form-actions">
                        <button class="ad-btn" type="button" (click)="editing.set(null)">Cancel</button>
                        <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save' }}</button>
                    </div>
                </div>
            </form>
        }

        <section class="ad-card">
            @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }
            @if (!loaded()) {
                <div class="ad-card__body"><div class="ad-skeleton" style="height:180px"></div></div>
            } @else if (!faqs().length) {
                <div class="ad-card__empty">No questions yet.</div>
            } @else {
                <div class="ad-table-wrap">
                    <table class="ad-table ad-table--stack">
                        <thead><tr><th>#</th><th>Question</th><th>Category</th><th>Status</th><th></th></tr></thead>
                        <tbody>
                            @for (f of faqs(); track f.id) {
                                <tr>
                                    <td data-label="#" class="muted">{{ f.order }}</td>
                                    <td data-label="Question"><strong>{{ f.question }}</strong><br><span class="ad-muted">{{ f.answer.length > 110 ? f.answer.slice(0, 110) + '…' : f.answer }}</span></td>
                                    <td data-label="Category">{{ f.category || '—' }}</td>
                                    <td data-label="Status"><ad-status [status]="f.active ? 'active' : 'hidden'" /></td>
                                    <td class="actions">
                                        <button class="ad-btn ad-btn--sm" type="button" (click)="startEdit(f)">Edit</button>
                                        <button class="ad-btn ad-btn--sm ad-btn--danger" type="button" (click)="remove(f)">Delete</button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            }
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly faqs = signal<Faq[]>([]);
    protected readonly loaded = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly editing = signal<Faq | 'new' | null>(null);
    protected readonly saving = signal(false);

    protected readonly form = inject(FormBuilder).nonNullable.group({
        question: ['', Validators.required],
        answer: ['', Validators.required],
        category: [''],
        order: [0],
        active: [true],
    });

    public ngOnInit(): void {
        this.load();
    }

    private load(): void {
        this.API.faqs().subscribe({
            next: f => { this.faqs.set(f); this.loaded.set(true); },
            error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); },
        });
    }

    protected startNew(): void {
        const NEXT = this.faqs().reduce((m, f) => Math.max(m, f.order), 0) + 1;
        this.form.reset({ question: '', answer: '', category: '', order: Math.min(NEXT, 255), active: true });
        this.editing.set('new');
    }

    protected startEdit(f: Faq): void {
        this.form.reset({ question: f.question, answer: f.answer, category: f.category ?? '', order: f.order, active: f.active });
        this.editing.set(f);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    protected save(): void {
        if (this.form.invalid) { this.form.markAllAsTouched(); this.TOAST.error('Question and answer are required.'); return; }
        const V = this.form.getRawValue();
        const BODY = { ...V, category: V.category || null };
        const E = this.editing();
        this.saving.set(true);
        const CALL = E === 'new' ? this.API.createFaq(BODY) : this.API.updateFaq((E as Faq).id, BODY);
        CALL.subscribe({
            next: () => { this.saving.set(false); this.editing.set(null); this.TOAST.success('Saved.'); this.load(); },
            error: e => { this.saving.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async remove(f: Faq): Promise<void> {
        if (!await this.CONFIRM.ask({ title: 'Delete this question?', message: f.question, confirmLabel: 'Delete', danger: true })) return;
        this.API.deleteFaq(f.id).subscribe({
            next: () => { this.TOAST.success('Deleted.'); this.load(); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }
}
