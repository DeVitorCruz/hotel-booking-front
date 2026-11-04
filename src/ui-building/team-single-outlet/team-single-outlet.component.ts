import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, InputSignal, Signal, Type } from '@angular/core';
import { TeamSingleContent } from '@ui-building/team-single/team-single.interface';
import { TEAM_SINGLE_REGISTRY, TeamSingleTemplate } from '@ui-building/team-single/team-single.registry';

@Component({
  selector: 'app-team-single-outlet',
  imports: [ NgComponentOutlet ],
  templateUrl: './team-single-outlet.component.html',
})
export class TeamSingleOutletComponent {
  public readonly CONTENT: InputSignal<TeamSingleContent> = input.required<TeamSingleContent>();
  public readonly template: InputSignal<TeamSingleTemplate> = input<TeamSingleTemplate>('default');
  public readonly RESOLVED_COMPONENT: Signal<Type<any>> = computed(() => TEAM_SINGLE_REGISTRY[this.template()] ?? TEAM_SINGLE_REGISTRY['default']);
}
