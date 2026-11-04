import { Swiper } from 'swiper';
import { isPlatformBrowser, NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, computed, Inject, 
  input, InputSignal, PLATFORM_ID, Signal, 
  signal, WritableSignal, output, OutputEmitterRef, ElementRef, 
  inject } from '@angular/core';
import { SlidItem } from './slide-item.interface';
import { ButtonFlex } from '../button/button.component';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-slide',
  imports: [
    ButtonFlex,
    NgComponentOutlet
],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements AfterViewInit {
  public swiper!: Swiper;
  public thumbSwiper!: Swiper;

  public readonly IS_BROWSER: WritableSignal<boolean> = signal<boolean>(true);
  public readonly SLIDE_ITEM: InputSignal<SlidItem> = input.required<SlidItem>();
  public readonly SLIDE: Signal<SlidItem> = computed<SlidItem>(() => { return this.SLIDE_ITEM(); });
  public readonly swiperReady: OutputEmitterRef<Swiper> = output<Swiper>();

  private readonly EL: ElementRef = inject(ElementRef);
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.IS_BROWSER.set(isPlatformBrowser(this.platformId));
  }
  
  public ngAfterViewInit(): void {
    this.setSwiper();
  }

  public setSwiper(): void {
    if (!this.IS_BROWSER()) return; 

    let options: SwiperOptions = this.SLIDE().slideConfig ?? {} as SwiperOptions;

    if (this.SLIDE().thumbs) {
      const THUMB_IMG: string = `.${this.SLIDE().thumbs!.containerClassName}`;
      const THUMB_EL: any = this.EL.nativeElement.querySelector(THUMB_IMG);

      if (THUMB_EL) {
        this.thumbSwiper = new Swiper(THUMB_EL, {
          ...this.SLIDE().thumbs!.slideConfig,
        });
        options = { ...options, thumbs: { swiper: this.thumbSwiper }, } as SwiperOptions;
      }
    }

    // Initialize main swiper scoped to this component
    const CONTAINER: string = `.${this.SLIDE().containerClassName}`;
    const MAIN_EL: any = this.EL.nativeElement.querySelector(CONTAINER);

    if(MAIN_EL) {
      this.swiper = new Swiper(MAIN_EL, options);
      this.swiperReady.emit(this.swiper);
    }
  }
}
