import { TestBed } from '@angular/core/testing';
import { THEME_CONFIG } from '../tokens/theme.token';
import { ThemeService } from './theme.service';
import { inject } from '@angular/core';
import type { ThemeConfig } from '../themes-features/theme.config.interface';


describe('Theme', () => {
  const DEMO: ThemeConfig = {
    id: 'demo',
    name: 'demo theme',
    styles: { '--test-color': '#123456' },
    content: { hero: { title: 'T' } },
    routes: []
  };
  
  let service: ThemeService;
  let document = inject(Document);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: THEME_CONFIG, useValue: DEMO },
        ThemeService
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('applies defualt theme styles on init', () => {
    const SVC = TestBed.inject(ThemeService);
    expect(SVC.getTheme()?.id).toBe('demo');
    expect(getComputedStyle(document.documentElement).getPropertyValue('--test-color').trim()).toBe('#123456');
  });

  it('getContent returns nested values', () => {
    const SVC = TestBed.inject(ThemeService);
    expect(SVC.getContent('hero.title')).toBe('T');
  });
});
