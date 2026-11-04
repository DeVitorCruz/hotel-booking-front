import { Component, input, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TestimonialContent } from './testimonial.interface';
import { TextBoxComponent } from '@shared/ui/text-box/text-box.component';
import { ImgFlex } from '@shared/ui/img-flex/img-flex.component';
import { SlideComponent } from '@shared/ui/side-slide/slide.component';
import { SlidItem } from '@shared/ui/side-slide/slide-item.interface';
import { SlideSwiperScreen } from '@shared/ui/side-slide/slide-swiper-screen.interface';
import { SwiperButton } from '@shared/ui/side-slide/slide-next-button.interface';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { ContainerBlock } from '@shared/ui/container/container-block.interface';
import { SequenceSpaceItem } from '@shared/ui/sequence-space/sequence-space-item';
import { SequenceSpaceComponent } from '@shared/ui/sequence-space/sequence-space.component';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { FlexHeadingItem } from '@shared/ui/flex-heading/flex-heading-item';
import { IconFlexComponent } from '@shared/ui/icon-flex/icon-flex.component';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';
import { faChevronLeft, faChevronRight, faQuoteLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-testimonial',
	standalone: true,
	imports: [TextBoxComponent, ImgFlex, SlideComponent],
	templateUrl: './testimonial.component.html',
	styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {
	public readonly CONTENT = input.required<TestimonialContent>();
	public readonly IS_BROWSER = signal<boolean>(false);
	public slideItem!: SlidItem;
	
	constructor(@Inject(PLATFORM_ID) private platformId: Object) {
		this.IS_BROWSER.set(isPlatformBrowser(this.platformId));
	}
	
	public ngOnInit(): void {
		this.slideItem = this._buildSlideItem();
	}
	
	/**
	 * Builds the SlidItem from TestimonialSlide[] using TextBoxComponent
	 * for each slide screen - fully reusing the shared slide system.
	 */
	private _buildSlideItem(): SlidItem {
		const slideList: SlideSwiperScreen[] = this.CONTENT().slides.map(
			(slide, index) => ({
				id: index,
				swiperComponent: ContainerComponent,
				swiperInput: {
					BLOCK_SEQUENCE_SPACE: {
						id: index,
						customBlockClassName: 'swiper-slid-list-block',
						customElementClassName: 'swiper-slid-list-element',
						customClassName: [],
						items: [
							{
								id: 0,  
								customClassName: [],
								component: SequenceSpaceComponent,
								componentInput: {
									SEQUENCE_SPACE_LIST: [
										{
											id: 0,  
											customClassName: [],
											component: IconFlexComponent,
											componentInput: {
												ICON_SWITCH: {
													type: 'iconAwesome',
													currentIcon: (slide.icon ?? faQuoteLeft) as IconDefinition,
												} as IconSwitch,
											},
										} as SequenceSpaceItem,
										{
											id: 1,  
											customClassName: [],
											component: TextBoxComponent,
											componentInput: {
												TEXT_BOX_LIST: [{
													id: 0,
													customBlockClassName: '',
												}] as TextBox[]
											},
										} as SequenceSpaceItem,
									] as SequenceSpaceItem[],
									COSTUME_CLASS_BLOCK_NAME: 'icon-swiper-wrap-block',
									COSTUME_CLASS_ELEMENT: 'icon-swiper-wrap-element',
									COSTUME_CLASS_NAME_LIST: []
								},
							} as SequenceSpaceItem,
							{
								id: 1,  
								customClassName: [],
								component: TextBoxComponent,
								componentInput: {
									TEXT_BOX_LIST: [{
										id: 0,
										text: [slide.quote],
										customBlockClassName: 'text-swiper-slide',
									}],
								},
							} as SequenceSpaceItem,
							{
								id: 2,  
								customClassName: [],
								component: SequenceSpaceComponent,
								componentInput: {
									SEQUENCE_SPACE_LIST: [
										{
											id: 0,  
											customClassName: [],
											component: TextBoxComponent,
											componentInput: {
												TEXT_BOX_LIST: [{
													id: 0,
													heading: {
														id: 0,
														headingType: 'h4',
														text: slide.author,
													} as  FlexHeadingItem,
													customBlockClassName: 'testimonial-author',
												}] as TextBox[],
											},
										} as SequenceSpaceItem,
										{
											id: 1,  
											customClassName: [],
											component: TextBoxComponent,
											componentInput: {
												TEXT_BOX_LIST: [{
													id: 0,
													text: [slide.role],
													customBlockClassName: 'testimonial-role',
												}] as TextBox[],
											},
										} as SequenceSpaceItem,
									] as SequenceSpaceItem[],
									COSTUME_CLASS_BLOCK_NAME: 'sub-text-swiper-block',
									COSTUME_CLASS_ELEMENT: 'sub_text-swiper-element',
									COSTUME_CLASS_NAME_LIST: []
								},
							} as SequenceSpaceItem,
						] as SequenceSpaceItem[],
					} as ContainerBlock,
				}
			})
		);
		
		const buttonList: SwiperButton[] = [
			{
				id: 0,
				type: 'button',
				iconType: { 
					type: 'iconAwesome',
					currentIcon: faChevronLeft as IconDefinition,
				},
				customClassName: ['ui-button--clickable'],
				classNameSwiper: 'swiper-button-prev',
				buttonEventListenerList: [], 
			},
			{
				id: 1,
				type: 'button',
				iconType: { 
					type: 'iconAwesome',
					currentIcon: faChevronRight as IconDefinition, 
				},
				customClassName: ['ui-button--clickable'],
				classNameSwiper: 'swiper-button-next',
				buttonEventListenerList: [],
			}
		];
		
		return {
			containerClassName: 'testimonial-swiper',
			slideConfig: {
				modules: [Navigation, Pagination, Autoplay],
				slidesPerView: 1,
				direction: 'horizontal',
				loop: true,
				autoplay: { delay: 4000, },
				pagination: { el: '.swiper-pagination', clickable: true },
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			swiperSlideList: slideList,
			buttonList: buttonList,
		};
	}
}
