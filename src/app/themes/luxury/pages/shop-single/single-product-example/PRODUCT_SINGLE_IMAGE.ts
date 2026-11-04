import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductSingleImage } from "@ui-building/product-single/product-single.interface";

export const PRODUCT_SINGLE_IMAGE: ProductSingleImage = {
    main: {
        src: 'assets/collection-info/1-earring-gold-large.jpg' as string,
        alt: 'earring' as string,
        placeholder: 'earring' as string,
    } as MediaImg,
    thumbs: [
        {
            src: 'assets/collection-info/2-earring-gold-large.jpg' as string,
            alt: 'earring' as string,
            placeholder: 'earing' as string,
        } as MediaImg,
        {
            src: 'assets/collection-info/3-earring-gold-large.jpg' as string,
            alt: 'earring' as string,
            placeholder: 'earing' as string,
        } as MediaImg,
        {
            src: 'assets/collection-info/4-earring-gold-large.jpg' as string,
            alt: 'earring' as string,
            placeholder: 'earing' as string,
        } as MediaImg,
        {
            src: 'assets/collection-info/5-earring-gold-large.jpg' as string,
            alt: 'earring' as string,
            placeholder: 'earing' as string,
        } as MediaImg,
        {
            src: 'assets/collection-info/6-earring-gold-large.jpg' as string,
            alt: 'earring' as string,
            placeholder: 'earing' as string,
        } as MediaImg,
    ] as MediaImg[],
} as ProductSingleImage;