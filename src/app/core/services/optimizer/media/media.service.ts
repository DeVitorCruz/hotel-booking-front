import { DOCUMENT, Inject, inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MediaImgPriority } from '../../../models/media/media-img-priority.enum';
import { MediaImg } from '../../../models/media/media-img.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly META = inject(Meta);

  private cache = new Map<string, string>();  
  private preloaded = new Set<string>();

  constructor(@Inject(DOCUMENT) public document: Document) {}

  public registerPreload(MediaImg: MediaImg): void {
    if (MediaImg.priority !== MediaImgPriority.CRITICAL) return;

    if (this.preloaded.has(MediaImg.src)) return;
    this.preloaded.add(MediaImg.src);
    
    const LINK = this.document.createElement('link');

    LINK.rel = 'preload';
    LINK.as = 'image';
    LINK.href = MediaImg.src;
    this.document.head.appendChild(LINK);

    this.META.addTag({ property: 'og:image', content: MediaImg.src });
  }

  public shouldLazyLoad(MediaImg: MediaImg): boolean {
    return MediaImg.priority !== MediaImgPriority.CRITICAL;
  }

  public getOptimizedSrc(path: string, size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md'): string {
    const KEY = `${path}-${size}`;

    if (this.cache.has(KEY)) return this.cache.get(KEY)!;

    const OPTIMIZED_PATH = `${path}?w=${this.geWidth(size)}&auto=format=auto&quality=80`;
    this.cache.set(KEY, OPTIMIZED_PATH);
    
    return OPTIMIZED_PATH;
  }

  private geWidth(size: string): number {
    switch(size) {
      case 'sm': return 640; 
      case 'md': return 768;
      case 'lg': return 1024;
      case 'xl': return 1280;
      case '2xl': return 1536;
      default: return 640;
    } 
  }
}
