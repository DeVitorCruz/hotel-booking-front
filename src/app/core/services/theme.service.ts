import { Inject, Injectable, DOCUMENT, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEME_CONFIG } from '../tokens/theme.token';
import { StorageService } from '../web-api-collect/storage/storage.service';
import { ThemeConfig } from '../themes-features/theme.config.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FASHION_CLOTHES_THEME_CONFIG } from '../../themes/fashion-clothes/theme.config';
import { JEWELRY_LUXURY_THEME_CONFIG } from '../../themes/luxury/theme.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private subject = new BehaviorSubject<ThemeConfig | null>(null);
  public readonly THEME_$: Observable<ThemeConfig | null> = this.subject.asObservable();
  private renderer!: Renderer2;
  private activeTheme?: string;

  constructor(
    @Inject(THEME_CONFIG) private defaultTheme: ThemeConfig | null,
    @Inject(DOCUMENT) private document: Document,
    public rendererFactory: RendererFactory2,
    public storageService: StorageService,
    private router: Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (this.defaultTheme) {
      this.setTheme(this.defaultTheme);
      this.switchTheme(this.defaultTheme.rootClassName);
    }

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.applyThemeFromRoute(event.urlAfterRedirects));
  }

  public setTheme(theme: ThemeConfig): void {
    this.subject.next(theme);

    if (theme.styles) this.applyStyles(theme.styles);
  }

  public getTheme(): ThemeConfig | null {
    return this.subject.getValue();
  }

  public getContent(path: string): any {
    const THEME = this.getTheme();
    if (!THEME || !THEME.content) return undefined;
    return path.split('.').reduce((obj: any, key: string) => (obj? obj[key] : undefined), THEME.content);
  }

  private applyStyles(styles: Record<string, string>): void {
    const ROOT = this.document.documentElement;
    Object.entries(styles).forEach(([k, v]) => ROOT.style.setProperty(k, v));
  }

  public switchTheme(theme: string | undefined): void {
    if (this.activeTheme) {
      this.renderer.removeClass(this.document.body, this.activeTheme);
    }

    if (theme !== undefined) {
      this.activeTheme = `${theme}`;
      this.renderer.addClass(this.document.body, this.activeTheme);
    } 
  }

  private applyThemeFromRoute(url: string): void {
    if (url.startsWith('/fashion-clothes')) this.setTheme(FASHION_CLOTHES_THEME_CONFIG);
    else this.setTheme(JEWELRY_LUXURY_THEME_CONFIG);
  }
}
