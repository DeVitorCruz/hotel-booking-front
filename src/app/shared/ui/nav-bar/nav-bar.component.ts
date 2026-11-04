import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { NavBarItem } from './nav-bar-item.interface';


@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    NgComponentOutlet,
    NgClass
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBar {
  public readonly NAV_BAR_ITEM = input.required<NavBarItem>();
  public readonly NAV_BAR = computed(() => { return this.NAV_BAR_ITEM(); });
}
