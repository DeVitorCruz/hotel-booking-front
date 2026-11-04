import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Extandable } from '../../../shared/ui/custom-list/expandable.type';

@Injectable({
  providedIn: 'root'
})
export class AccordionStateService implements OnInit {
  public readonly STATE_KEY = signal<number | null>(null);

  public registry = new Map<string, WritableSignal<boolean>>();

  public ngOnInit(): void {
    this.resetAll();
  }

  public toggleById(subItem_code: string): void {
    const SUB_ITEM_CODE = this.registry.get(subItem_code);
    if (SUB_ITEM_CODE) SUB_ITEM_CODE.update(current => !current);
  }

  public getSignal(subItem_code: string): WritableSignal<boolean> {
    if (!this.registry.has(subItem_code)) {
      this.registry.set(subItem_code, signal(false));
    }
    return this.registry.get(subItem_code)!;
  }

  public searchAndReveal(nodes: Extandable[]): void {
    nodes.forEach((node) => {
      if (node.type === 'subItem') {
        if (!this.registry.has(node.subItem_code)) {
          this.registry.set(node.subItem_code, signal(false));
        }
        this.searchAndReveal(node.subItems);
      }
    });
  }

  public resetAll() {
    this.registry.forEach((s) => { s.set(false); });   
  }
}
