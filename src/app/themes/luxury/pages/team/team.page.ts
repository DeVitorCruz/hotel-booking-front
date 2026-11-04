import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CardGridComponent } from '@ui-building/card-grid/card-grid.component';
import { TeamService } from '@core/services/team/team.service';
import { Router } from '@angular/router';
import { TeamMember } from '@core/models/shared/team/team.model';
import { CardGridContent, CardItem } from '@ui-building/card-grid/card-grid.interface';
import { HEADER } from './header/HEADER';
import { TEAM_MEMBERS } from './team_members/TEAM_MEMBERS';
import { MediaImg } from '@core/models/media/media-img.interface';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { FlexHeadingItem } from '@shared/ui/flex-heading/flex-heading-item';
import { AnchorFlexItem } from '@shared/ui/anchor-flex/anchor-flex-item.interface';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';

@Component({
  selector: 'app-team',
  imports: [CardGridComponent],
  templateUrl: './team.page.html',
  styleUrl: './team.page.scss'
})
export class TeamPage implements OnInit {
  private readonly TEAM_SERVICE = inject(TeamService);
  private readonly ROUTER = inject(Router);

  public readonly LOADING = signal<boolean>(false);
  public readonly TEAM_CONTENT = signal<CardGridContent | null>(null);
  public readonly _CONTENT_EFFECT = computed(() => { return this.TEAM_CONTENT(); });
  public readonly _LOADING_EFFECT = computed(() => this.LOADING());

  constructor() {
    effect(() => {
      this._CONTENT_EFFECT();
      this._LOADING_EFFECT();
    });
  }

  public ngOnInit(): void {
    this.TEAM_CONTENT.set(TEAM_MEMBERS);
  }

  public setTeamContent(): void {
    this.LOADING.set(true);

    this.TEAM_SERVICE.getAll().subscribe({
        next: (response) => {
          this.TEAM_CONTENT.set(
            {
              header: HEADER as TextBox[],
              cards: response.data.map(m => this._mapToCard(m)) as CardItem[],
              gridClassName: 'grid-team-members',
              sectionClassName: 'team-grid',
            }
          );
        },
        error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _mapToCard(member: TeamMember): CardItem {
    return {
      id: member.id,
      image: {
        src: member.photo ?? 'assets/collection-info/team-about-img-1.jpg',
        alt: member.name,
      } as MediaImg,
      content: [
        {
          id: 0,
          heading: {
              id: 0,
              headingType: 'h2',
              achorFlexList: [
                  {
                    id: 0,
                    title: member.name.toUpperCase(),
                    ariaLabel: member.name,
                    rlink: `/team/${member.id}`,
                    switchAbleIcon: { type: 'none' } as IconSwitch,
                  }
              ] as AnchorFlexItem[],
          } as FlexHeadingItem,
          text: [member.role] as string[],
          customBlockClassName: `card-member-${member.id}-content`,
        } as TextBox,
      ] as TextBox[],
      customClassName: [`card-member-${member.id}`] as string[],
    } as CardItem;
  }
}
