import { Component, InputSignal, WritableSignal, input, signal, computed, Signal } from '@angular/core';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { TabPanelContent, TabItem } from './tab-panel.interface';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss'
})
export class TabPanelComponent {
  public readonly CONTENT: InputSignal<TabPanelContent> = input.required<TabPanelContent>();
  public readonly ACTIVE_TAB: WritableSignal<number> = signal<number>(0);
  public readonly ACTIVE_ITEM!: Signal<TabItem>;

  constructor() {
    this.ACTIVE_ITEM = computed<TabItem>(() => {
      return this.CONTENT().tabs.find(t => t.id === this.ACTIVE_TAB())?? this.CONTENT().tabs[0] as TabItem;
    });
  }

  public setTab(tab: TabItem): void {
    this.ACTIVE_TAB.set(tab.id);
  }

  public isActive(tab: TabItem): boolean {
    return this.ACTIVE_TAB() === tab.id;
  }
}
