import { BlogAuthor, BlogPost } from "@core/models/blog/blog-post.model";

export const EXAMPLE_POST: BlogPost = {
    id: 1 as number,
    title: 'The Art of Fine Jewelry' as string,
    slug: 'the-art-of-fine-jewelry' as string,
    excerpt: 'Discover the craftsmanship behind our most iconic pieces.' as string | null,
    body: `
        <p>Fine jewelry is more than adornment - it is an art from that has been refined over centuries.
        Each pice tells a story, from the careful selection of gemstones to the skilled hands that shape 
        precious metals into form of enduring beauty.</p>

        <p>At our atelier, we believe that every piece of jewelry should be crafted with intention.
        Our artisans draw on generations of knowledge, blending traditional techniques with contemporary
        design sensibilities to create pieces that are both timeless and distinctly modern.</p>

        <br>

        <h3>The Selection of Materials</h3>
        <p>The journey of a fine jewelry piece begins long before it reaches the workshop. We source
        only the finest materials - ethically mined gemstones, recycled precious metals, and rare
        elements that meet our exacting standards for quality and sustainability.</p>

        <br>

        <h3>The Craftsmanaship</h3>
        <p>Our master jewelers spend years perfecting their craft. From the initial sketch to the
        final polish, every step of the process is executed with meticulous attention to detail.</p>
    ` as string,
    cover_image: null as string | null,
    status: 'published',
    published_at: '2025-01-01T00:00:00Z' as string | null,
    created_at: '2025-01-01T00:00:00Z' as string,
    updated_at: '2025-01-01T00:00:00Z' as string,
    author: {
        id: 1 as number,
        name: 'Admin' as string,
    } as BlogAuthor,
} as BlogPost;