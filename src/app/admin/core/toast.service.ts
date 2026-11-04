import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    kind: 'success' | 'error' | 'info';
    text: string;
}

/** Small transient notifications shown by the admin shell. */
@Injectable({ providedIn: 'root' })
export class ToastService {
    private seq = 0;
    public readonly TOASTS = signal<Toast[]>([]);

    public success(text: string): void { this.push('success', text); }
    public error(text: string): void { this.push('error', text, 7000); }
    public info(text: string): void { this.push('info', text); }

    public dismiss(id: number): void {
        this.TOASTS.update(list => list.filter(t => t.id !== id));
    }

    private push(kind: Toast['kind'], text: string, ms = 4000): void {
        const ID = ++this.seq;
        this.TOASTS.update(list => [...list.slice(-3), { id: ID, kind, text }]);
        setTimeout(() => this.dismiss(ID), ms);
    }
}
