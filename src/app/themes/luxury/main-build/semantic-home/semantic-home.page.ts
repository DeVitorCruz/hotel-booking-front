import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Semantic } from '@layouts/semantic/semantic.component';
import { NavBar } from '@shared/ui/nav-bar/nav-bar.component';
import { ThemeService } from '@core/services/theme.service';
import { Pages } from '@pages/pages.type';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { ButtonFlex } from '@shared/ui/button/button.component';
import { ButtonItem } from '@shared/ui/button/button-item.interface';
import { CLOSE_LEFT_BUTTON } from './CLOSE_LEFT_BUTTON';
import { StickyOnScroll } from '@core/directives/sticky-on-scroll/sticky-on-scroll';
import { MatSideLeftBarService } from '@core/services/side-bar/mat-side-left-bar.service';
import { MatSideRightBarService } from '@core/services/side-bar/mat-side-right-bar.service';
import { CLOSE_RIGHT_BUTTON } from './CLOSE_RIGHT_BUTTON';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SemanticHomeNavBar } from './semantic-home-nav-bar.interface';
import { ContainerBlock } from '@shared/ui/container/container-block.interface';
import { SemanticSideBar } from './semantic-side-bar.interface';
import { SemanticFeatures } from '@layouts/semantic/semantic-features.interface';
import { NAV_BAR } from './NAV_BAR';
import { FOOTER_CHILDS } from './FOOTER_CHILDS';
import { RIGHT_SIDE_BAR } from './RIGHT_SIDE_BAR';
import { LEFT_SIDE_BAR } from './LEFT_SIDE_BAR';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-semantic-home',
  imports: [
    Semantic,
    NavBar,
    ContainerComponent,
    MatButtonModule,
    MatSidenavModule,
    NgComponentOutlet,
    ButtonFlex,
    StickyOnScroll,
    RouterOutlet
  ],
  templateUrl: './semantic-home.page.html'
})
export class SemanticHome implements AfterViewInit {
  public readonly PAGES = signal<Pages>({});
  
  /** Tracks the active page key from the URL (e.g. 'home', 'about', 'shop') */
  public readonly ACTIVE_PAGE = signal<string>('home');
  
  /** Returns the current page config or falls back to 'home' */
  public readonly CURRENT_PAGE = computed<SemanticFeatures>(() => {
	 const PAGES = this.PAGES();
	 const KEY = this.ACTIVE_PAGE(); 
	 return PAGES?.[KEY] ?? PAGES?.['home'] ?? {};
  });
  
  public readonly EXTRACTED_PAGES = computed(() => { return this.PAGES(); });

  public readonly SHOW_FILLER = signal<boolean>(false);
  public readonly FILLER = computed(() => { return this.SHOW_FILLER(); });

  private readonly _MAT_SIDE_LEFT_NAV_SERVICE = inject(MatSideLeftBarService);
  private readonly _MAT_SIDE_RIGHT_NAV_SERVICE = inject(MatSideRightBarService);

  public readonly CLOSE_LEFT_BUTTON: ButtonItem = CLOSE_LEFT_BUTTON;
  public readonly CLOSE_RIGHT_BUTTON: ButtonItem = CLOSE_RIGHT_BUTTON;

  public readonly NAV_BAR: SemanticHomeNavBar = NAV_BAR;
  public readonly FOOTER_CHILDS: ContainerBlock = FOOTER_CHILDS;

  public readonly RIGHT_SIDE_BAR: SemanticSideBar = RIGHT_SIDE_BAR;
  public readonly LEFT_SIDE_BAR: SemanticSideBar = LEFT_SIDE_BAR;

  @ViewChild('rightDrawer') public rightSideBtn!: MatSidenav;
  @ViewChild('leftDrawer') public leftSideBtn!: MatSidenav;

  constructor(
	private theme: ThemeService,
	private router: Router) {
    const CONTENT = this.theme.getContent('pages');
    this.PAGES.set(CONTENT ?? {});
  }

  public ngAfterViewInit(): void {
    this.setRightSideNav();
    this.setLeftSideNav();
    this._trackActiveRoute();
  }

  public setRightSideNav(): void {
    this._MAT_SIDE_RIGHT_NAV_SERVICE.setRightSidebar(this.rightSideBtn);
  }

  public setLeftSideNav(): void {
    this._MAT_SIDE_LEFT_NAV_SERVICE.setLeftSideBar(this.leftSideBtn);
  }
  
  /**
   * Watches route changes and extracts the last URL segment
   * as the active page key (e.g. '/home' -> 'home', '/shop' -> 'shop').
   * */
  private _trackActiveRoute(): void {
    const EXTRACT_KEY = (url: string): string => {
      const SEGMENTS = url.split('/').filter(Boolean);
      return SEGMENTS[SEGMENTS.length - 1] || 'none';
    };
    
    // Set initial page from current URL
    // this.ACTIVE_PAGE.set(EXTRACT_KEY(this.router.url));
        
    // Update on every navigation
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      // this.ACTIVE_PAGE.set(EXTRACT_KEY(e.urlAfterRedirects));
      this._MAT_SIDE_LEFT_NAV_SERVICE.closeLeftSidebar();
      this._MAT_SIDE_RIGHT_NAV_SERVICE.closeRightSidebar();
	  });
  }
}
