import { Injectable, signal } from '@angular/core';

export interface ConfirmRequest {
    title: string;
    message?: string;
    confirmLabel?: string;
    danger?: boolean;
    /** Ask for a short text (e.g. a cancellation reason). */
    input?: { label: string; required?: boolean; value?: string };
    /** Optional checkbox (e.g. "Refund the guest"). */
    checkbox?: { label: string; checked?: boolean };
}

export interface ConfirmResult {
    text: string;
    checked: boolean;
}

/** In-page confirmation dialog (no browser alert/confirm). Rendered by the admin shell. */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
    public readonly CURRENT = signal<(ConfirmRequest & { resolve: (r: ConfirmResult | null) => void }) | null>(null);

    public ask(req: ConfirmRequest): Promise<ConfirmResult | null> {
        this.CURRENT()?.resolve(null);
        return new Promise(resolve => this.CURRENT.set({ ...req, resolve }));
    }

    public close(result: ConfirmResult | null): void {
        const C = this.CURRENT();
        this.CURRENT.set(null);
        C?.resolve(result);
    }
}
