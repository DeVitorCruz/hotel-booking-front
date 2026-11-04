import { SafeHtml } from "@angular/platform-browser";

export interface ArticleAuthor {
    name: string;
    avatar?: string;
};

export interface ArticleContent {
    title: string;
    excerpt?: string;
    body: SafeHtml;
    cover_image?: string;
    published_at?: string;
    author: ArticleAuthor;
    back_link?: string;
    back_label?: string;
};
