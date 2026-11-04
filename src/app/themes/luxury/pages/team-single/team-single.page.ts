import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaImg } from '@core/models/media/media-img.interface';
import { TeamMember } from '@core/models/shared/team/team.model';
import { TeamService } from '@core/services/team/team.service';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AnchorFlexItem } from '@shared/ui/anchor-flex/anchor-flex-item.interface';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { TeamSingleContent } from '@ui-building/team-single/team-single.interface';
import { TEAM_SINGLE_EXAMPLE } from './team-single-example/TEAM_SINGLE_EXAMPLE';
import { TeamSingleOutletComponent } from '@ui-building/team-single-outlet/team-single-outlet.component';

@Component({
  selector: 'app-team-single',
  imports: [ TeamSingleOutletComponent ],
  templateUrl: './team-single.page.html',
  styleUrl: './team-single.page.scss'
})
export class TeamSinglePage implements OnInit {
  private readonly TEAM_SERVICE: TeamService = inject(TeamService);
  private readonly ROUTE: ActivatedRoute = inject(ActivatedRoute);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly DETAIL_CONTENT: WritableSignal<TeamSingleContent | null> = signal<TeamSingleContent | null>(null);

  constructor() {
    this.DETAIL_CONTENT.set(TEAM_SINGLE_EXAMPLE);
  }

  public ngOnInit(): void {
    const ID: number = Number(this.ROUTE.snapshot.paramMap.get('id'));
    if (!ID) { this.ROUTER.navigate(['/error-404']); return; }
    // this.loadMember(ID);
  }

  private loadMember(id: number): void {
    this.LOADING.set(true);

    this.TEAM_SERVICE.getById(id).subscribe({
      next: (member) => {
        this.DETAIL_CONTENT.set(this._buildContent(member));
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _buildContent(member: TeamMember): TeamSingleContent {
    return {
      image: {
        src: member.photo ?? 'assets/collection-info/team-about-img-1.jpg' as string,
        alt: member.name as string,
        placeholder: member.name as string,
      } as MediaImg,
      name: member.name as string,
      role: member.role as string,
      bio: member.bio as string,
      email: member.email as string,
      phone: member.phone as string,
      socialLinks: this._buildSocialLinks(member) as AnchorFlexItem[],
      extraContent: [
        {
          id: 0 as number,
          text: ['Extra Content'] as string[],
          customBlockClassName: 'extra-content-example-block' as string,
        } as TextBox,
      ] as TextBox[],
    } as TeamSingleContent;
  }

  private _buildSocialLinks(member: TeamMember): AnchorFlexItem[] {
    const LINKS: AnchorFlexItem[] = [];
    let id: number = 0;

    if (member.linkedin) {
      LINKS.push({
        id: id++ as number,
        title: '' as string,
        ariaLabel: 'LinkedIn' as string,
        rlink: member.linkedin as string,
        switchAbleIcon: {
          type: 'iconAwesome',
          currentIcon: faLinkedin as IconDefinition,
        } as IconSwitch,
      } as AnchorFlexItem);
    }

    if (member.twitter) {
      LINKS.push({
        id: id++ as number,
        title: '' as string,
        ariaLabel: 'Twitter' as string,
        rlink: member.twitter as string,
        switchAbleIcon: {
          type: 'iconAwesome',
          currentIcon: faTwitter as IconDefinition,
        } as IconSwitch,
      } as AnchorFlexItem);
    }

    if (member.facebook) {
      LINKS.push({
        id: id++ as number,
        title: '' as string,
        ariaLabel: 'Facebook' as string,
        rlink: member.facebook as string,
        switchAbleIcon: {
          type: 'iconAwesome',
          currentIcon: faFacebook as IconDefinition,
        } as IconSwitch,
      } as AnchorFlexItem);
    }

    if (member.instagram) {
      LINKS.push({
        id: id++ as number,
        title: '' as string,
        ariaLabel: 'Instagram' as string,
        rlink: member.instagram as string,
        switchAbleIcon: {
          type: 'iconAwesome',
          currentIcon: faInstagram as IconDefinition,
        } as IconSwitch,
      } as AnchorFlexItem);
    }
    
    return LINKS as AnchorFlexItem[];
  }
}
