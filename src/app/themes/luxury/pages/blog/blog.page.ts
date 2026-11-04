import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BlogPost } from '@core/models/blog/blog-post.model';
import { CardGridContent, CardItem } from '@ui-building/card-grid/card-grid.interface';
import { BlogService } from '@core/services/blog/blog.service';
import { Router } from '@angular/router';
import { PaginationContent } from '@ui-building/pagination/pagination.interface';
import { BLOG_HEADER } from './blog-content/BLOG_HEADER';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { MediaImg } from '@core/models/media/media-img.interface';
import { FlexHeadingItem } from '@shared/ui/flex-heading/flex-heading-item';
import { AnchorFlexItem } from '@shared/ui/anchor-flex/anchor-flex-item.interface';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';
import { CardGridComponent } from '@ui-building/card-grid/card-grid.component';
import { PaginationComponent } from '@ui-building/pagination/pagination.component';
import { BLOG_EXAMPLE_LIST } from './blog-content/BLOG_EXAMPLE_LIST';

@Component({
  selector: 'app-blog',
  imports: [CardGridComponent, PaginationComponent],
  templateUrl: './blog.page.html',
})
export class BlogPage implements OnInit {
  private readonly BLOG_SERVICE: BlogService = inject(BlogService);
  private readonly ROUTER: Router = inject(Router);
  
  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly BLOG_CONTENT: WritableSignal<CardGridContent | null> = signal<CardGridContent | null>(null);
  public readonly PAGINATION: WritableSignal<PaginationContent | null> = signal<PaginationContent | null>(null);
  public readonly SEARCH: WritableSignal<string> = signal<string>('');
  
  private readonly HEADER: WritableSignal<TextBox[]> = signal<TextBox[]>(BLOG_HEADER);

  public ngOnInit(): void {
    this.BLOG_CONTENT.set(BLOG_EXAMPLE_LIST);
  }

  public loadPosts(page: number): void {
    this.LOADING.set(true);

    this.BLOG_SERVICE.getAll(page, this.SEARCH() || undefined).subscribe({
      next: (response) => {
        this.BLOG_CONTENT.set({
          header: this.HEADER() as TextBox[],
          cards: response.data.map(p => this._mapToCard(p)) as CardItem[],
          gridClassName: 'blog' as string,
          sectionClassName: 'blog-grid' as string,
        } as CardGridContent);
        this.PAGINATION.set({
          currentPage: response.current_page as number,
          lastPage: response.last_page as number,
        } as PaginationContent);
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _mapToCard(post: BlogPost): CardItem {
    return {
      id: 0 as number,
      image: {
        src: this.BLOG_SERVICE.getCoverImageUrl(post.cover_image) as string,
        alt: post.title as string,
      } as MediaImg,
      content: [
        {
          id: 0 as number,
          text: [
            this.BLOG_SERVICE.formatDate(post.published_at),
            `By ${post.author.name}`,
          ] as string[],
        } as TextBox,
        {
          id: 1 as number,
          heading: {
            id: 0 as number,
            headingType: 'h3',
            text: '' as string,
            achorFlexList: [
              {
                id: 0 as number,
                title: post.title as string,
                ariaLabel: post.title as string,
                rlink: `/blog/${post.id}` as string,
                switchAbleIcon: { type: 'none' } as IconSwitch,
              } as AnchorFlexItem,
            ] as AnchorFlexItem[],
          } as FlexHeadingItem,
        } as TextBox,
        {
          id: 2 as number,
          text: post.excerpt ? [post.excerpt] : [] as string[],
        } as TextBox,
      ] as TextBox[],
      customClassName: ['blog-card'] as string[],
      link: `/blog/${post.id}` as string,
    } as CardItem; 
  }

  public onSearch(value: string): void {
    this.SEARCH.set(value);
    this.loadPosts(1);
  }

  public onPageChange(page: number): void {
    this.loadPosts(page);
  }
}
