import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { ThemeConfig } from './core/themes-features/theme.config.interface';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html'
})
export class App {
  protected readonly TITLE = signal<string>('datentria');
  public theme: ThemeConfig | null;
  public hero!: any;

  constructor(private ThemeService: ThemeService) {
    this.theme = this.ThemeService.getTheme();
    this.hero = this.ThemeService.getContent('hero');
  }
}
