import { Type } from "@angular/core";
import { ArticleComponent } from "./article.component";

export const ARTICLE_REGISTRY: Record<string, Type<any>> = {
    'default': ArticleComponent,
    // 'featured': ArticleFeaturedComponent, <- future
    // 'minimal': ArticleMinimalComponent, <- future
};

export type ArticleTemplate = keyof typeof ARTICLE_REGISTRY; 