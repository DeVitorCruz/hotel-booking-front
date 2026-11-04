import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { MediaImg } from '@core/models/media/media-img.interface';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface TestimonialSlide {
	quote: string;
	author: string;
	role: string;
	icon?: IconDefinition; // optional - defaults to faQuoteLeft if not provided
}

export interface TestimonialContent {
	header: TextBox[]; // Title + subtitle -> TextBoxComponent
	image: MediaImg; // photo -> ImgFlex
	slides: TestimonialSlide[]; // quotes -> SlideComponent (built internall)
}

