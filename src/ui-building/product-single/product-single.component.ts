import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal, signal, Type, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ProductSingleContent } from './product-single.interface';
import { SlidItem } from '@shared/ui/side-slide/slide-item.interface';
import { SwiperButton } from '@shared/ui/side-slide/slide-next-button.interface';
import { SlideSwiperScreen } from '@shared/ui/side-slide/slide-swiper-screen.interface';
import { SwiperOptions } from 'swiper/types';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';
import { faArrowLeft, faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MediaImg } from '@core/models/media/media-img.interface';
import { ImgFlex } from '@shared/ui/img-flex/img-flex.component';
import { SlideComponent } from '@shared/ui/side-slide/slide.component';
import { TabPanelComponent } from '@ui-building/tab-panel/tab-panel.component';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


@Component({
  selector: 'app-product-single',
  imports: [ NgClass, SlideComponent, TabPanelComponent ],
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.scss'
})
export class ProductSingleComponent {
  public readonly CONTENT: InputSignal<ProductSingleContent> = input.required<ProductSingleContent>(); 
  public readonly addToCart: OutputEmitterRef<number> = output<number>();

  public readonly QUANTITY: WritableSignal<number> = signal<number>(1);
  public readonly STARS: number[] = [1, 2, 3, 4, 5];

  public readonly GALLERY: Signal<SlidItem> = computed<SlidItem>(() => ({
    buttonList: [
      {
        id: 0 as number,
        title: '' as string,
        type: 'button',
        customClassName: [] as string[],
        iconType: { 
          type: 'iconAwesome', 
          currentIcon: faArrowLeft as IconDefinition } as IconSwitch,
        classNameSwiper: 'swiper-button-prev' as string,
      } as SwiperButton,
      {
        id: 1 as number,
        title: '' as string,
        type: 'button',
        customClassName: [] as string[],
        iconType: { 
          type: 'iconAwesome', 
          currentIcon: faArrowRight as IconDefinition } as IconSwitch,
        classNameSwiper: 'swiper-button-next' as string,
      } as SwiperButton,
    ] as SwiperButton[],
    swiperSlideList: [
      this._buildSlide(0, this.CONTENT().images.main),
      ...this.CONTENT().images.thumbs.map((img, i) => 
        this._buildSlide(i + 1, img)
      ),
    ] as SlideSwiperScreen[],
    // <- thumbs linked swiper
    slideConfig: {
      // <- modules activated here at product-single level
      modules: [Navigation, Thumbs],
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    } as SwiperOptions,
    containerClassName: 'product-single-main-swiper' as string,
    // <- thumbs linked swiper
    thumbs: {
      buttonList: [] as SwiperButton[],
      swiperSlideList: [
        this._buildSlide(0, this.CONTENT().images.main),
          ...this.CONTENT().images.thumbs.map((img, i) => 
            this._buildSlide(i + 1, img)
          )
      ] as SlideSwiperScreen[],
      slideConfig: {
        modules: [FreeMode, Thumbs],
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true, 
        watchSlidesProgress: true,
      } as SwiperOptions,
      containerClassName: 'product-single-thumb-swiper' as string,
    } as SlidItem,
  }) as SlidItem);

  public readonly FORMATTED_PRICE: Signal<string> = computed<string>(() => {
    const C: string = this.CONTENT().price.currency ?? '$';    
    return `${C}${this.CONTENT().price.regular.toFixed(2)}`;
  });

  public readonly FORMATTED_DISCOUNT: Signal<string | null> = computed<string | null>(() => {
    const D: number = this.CONTENT().price.discount!;
    if (!D) return null;
    const C: string = this.CONTENT().price.currency ?? '';
    return `${C}${D.toFixed(2)}`;
  });

  public readonly FULL_RATING: Signal<number> = computed<number>(() => Math.round(this.CONTENT().rating));

  public isStarActive(star: number): boolean {
    return star <= this.FULL_RATING();
  } 

  public decrement(): void {
    if (this.QUANTITY() > 1) this.QUANTITY.update(q => q - 1); 
  }

  public increment(): void {
    this.QUANTITY.update(q => q + 1);
  }

  public onQuantityChange(value: string): void {
    const PARSED: number = parseInt(value, 10);
    if (!isNaN(PARSED) && PARSED >= 1) this.QUANTITY.set(PARSED);
  }

  public handleAddToCart(): void {
    this.addToCart.emit(this.QUANTITY());
  }

  private _buildSlide(id: number, img: MediaImg): SlideSwiperScreen {
    return {
      id: id as number,
      swiperComponent: ImgFlex as Type<any>,
      swiperInput: {
        IMAGE_FLEX_ITEM: img as MediaImg,
      } as Record<string, any>,
    } as SlideSwiperScreen;
  }
}
