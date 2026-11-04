import { isPlatformBrowser } from '@angular/common';
import { computed, Directive, ElementRef, inject, Inject, input, OnDestroy, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { MediaService } from '../../../services/optimizer/media/media.service';
import { MediaImg } from '../../../models/media/media-img.interface';

@Directive({
  selector: '[appSmartImage]'
})
export class SmartImageDirective implements OnInit, OnDestroy {

  public readonly MEDIA_IMG_SWITHER = input.required<MediaImg>();
  public readonly MEDIA_IMG = computed(() => { return this.MEDIA_IMG_SWITHER(); });
  public mediaImgSwither!: MediaImg;

  public readonly RENDERER = inject(Renderer2);

  private readonly OBSERVER_START = signal<IntersectionObserver | null>(null);
  private readonly OBSERVER = computed(() => { return this.OBSERVER_START(); });

  private readonly IS_BROWSER = signal<boolean>(false);
  private readonly MEDIA_SERVICE = inject(MediaService);

  constructor(
    private el: ElementRef<HTMLImageElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.IS_BROWSER.set(isPlatformBrowser(this.platformId));
  }

  public ngOnInit(): void {
    this.handelLazyLoad();
  }

  public handelLazyLoad(): void {
    this.setImage();
    this.lazyLoadSource(this.mediaImgSwither);        
  }

  private lazyLoadSource(MediaImg: MediaImg): void {
    const IMG = this.el.nativeElement;
    const { src, alt } = MediaImg;
    
    if (!this.IS_BROWSER()) {
      IMG.src = src;
      return;
    }

    const OPTIMIZED_SRC = this.MEDIA_SERVICE.getOptimizedSrc(src);
    
    this.RENDERER.setAttribute(IMG, 'alt', alt || '');

    if (this.MEDIA_SERVICE.shouldLazyLoad(this.mediaImgSwither)) {
      this.RENDERER.setAttribute(IMG, 'loading', 'lazy');

      this.OBSERVER_START.set(new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            IMG.src = OPTIMIZED_SRC || '';
            this.OBSERVER()?.disconnect();
          }
        });
      }));

      this.OBSERVER()?.observe(IMG);
    } else {
      this.MEDIA_SERVICE.registerPreload(MediaImg);
      this.RENDERER.setAttribute(IMG, 'fetchpriority', 'high');
      IMG.src = OPTIMIZED_SRC;
    }
  }

  public ngOnDestroy(): void {
    this.OBSERVER()?.disconnect();
    this.el.nativeElement.src = '';
  }

  private setImage(): void {
    this.mediaImgSwither = this.MEDIA_IMG(); 
  }
}
