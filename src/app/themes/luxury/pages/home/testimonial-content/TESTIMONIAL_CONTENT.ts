import { MediaImg } from "@core/models/media/media-img.interface";
import { faQuoteLeft, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TestimonialContent, TestimonialSlide } from "@ui-building/testimonial/testimonial.interface";

export const TESTIMONIAL_CONTENT: TestimonialContent = {
    header: [
        {
            id: 0,
            heading: { id: 0, headingType: 'h2', text: 'Trusted From Clients' },
            text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus.'] 
        }
    ] as TextBox[],
    image: {
        src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/text-image/content-wrap/image-wrap/trastimonial-image.jpg',
        alt: 'testimonial image'
    } as MediaImg,
    slides: [
        {
            quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            author: 'Jennifer Lopez',
            role: 'Happy Customer',
            icon: faQuoteLeft as IconDefinition,
        },
        {
            quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            author: 'Jennifer Lopez',
            role: 'Happy Customer',
            icon: faQuoteLeft as IconDefinition,
        },
        {
            quote: 'Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer.',
            author: 'Michael Brown',
            role: 'Happy Customer',
            icon: faQuoteLeft as IconDefinition,
        },
    ] as TestimonialSlide[],		
};