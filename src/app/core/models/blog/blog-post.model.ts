export interface BlogAuthor {
    id: number;
    name: string;
};

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string;
    cover_image: string | null;
    status: 'draft' | 'published';
    published_at: string | null;
    created_at: string;
    updated_at: string;
    author: BlogAuthor;
};

export interface BlogPagination {
    current_page: number;
    data: BlogPost[];
    total: number;
    per_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
};
