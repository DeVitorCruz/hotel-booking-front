import { Component, computed, input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { IconSwitch } from './icon-switch.type';


@Component({
  selector: 'app-icon-flex',
  imports: [
    FontAwesomeModule,
    MatIconModule
  ],
  templateUrl: './icon-flex.component.html'
})
export class IconFlexComponent implements OnInit {
  public readonly ICON_SWITCH = input.required<IconSwitch>();
  public readonly ICON = computed(() => { return this.ICON_SWITCH(); });
  public current_icon_kit!: IconSwitch;
  
  public ngOnInit(): void {
    this.switchIcon();
  }

  public switchIcon(): void {
    this.current_icon_kit = this.ICON();
  }
}
