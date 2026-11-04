import { Component, input, InputSignal } from '@angular/core';
import { TeamSingleContent } from './team-single.interface';
import { ImgFlex } from '@shared/ui/img-flex/img-flex.component';
import { AnchorFlex } from '@shared/ui/anchor-flex/anchor-flex.component';
import { TextBoxComponent } from '@shared/ui/text-box/text-box.component';

@Component({
  selector: 'app-team-single',
  imports: [ ImgFlex, AnchorFlex, TextBoxComponent ],
  templateUrl: './team-single.component.html',
  styleUrl: './team-single.component.scss'
})
export class TeamSingleComponent {
  public readonly CONTENT: InputSignal<TeamSingleContent> = input.required<TeamSingleContent>();
}
