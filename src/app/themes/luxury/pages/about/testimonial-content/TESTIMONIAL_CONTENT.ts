import { MediaImg } from "@core/models/media/media-img.interface";
import { faQuoteLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TestimonialContent, TestimonialSlide } from "@ui-building/testimonial/testimonial.interface";

export const TESTIMONIAL_CONTENT: TestimonialContent = {
    header: [
        {
            id: 0,
            heading: { id: 0, headingType: 'h2', text: 'What Our From Clients Says' },
            text: ['We take pride in delivering exceptional jewelry that our clients love.'] 
        }
    ] as TextBox[],
    image: {
        src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/text-image/content-wrap/image-wrap/trastimonial-image.jpg',
        alt: 'about testimonial image'
    } as MediaImg,
    slides: [
        {
            quote: 'Absolutely stunning craftsmanship. Every piece I have purchased has exceeded my expectations in quality and beauty.',
            author: 'Sarah Williams',
            role: 'Loyal Customer',
            icon: faQuoteLeft as IconDefinition,
        },
        {
            quote: 'The attention to detail is remarkable. I receive compliments every time I wear their jewelry.',
            author: 'Emma Johnson',
            role: 'Happy Customer',
            icon: faQuoteLeft as IconDefinition,
        },
        {
            quote: 'Exceptional quality and timeless designs. This is my go-to place for all special occasions.',
            author: 'Maria Garcia',
            role: 'Returning Customer',
            icon: faQuoteLeft as IconDefinition,
        },
    ] as TestimonialSlide[],  
};