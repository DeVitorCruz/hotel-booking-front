import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EXAMPLE_POST } from './blog-single-content/EXAMPLE_POST';
import { BlogService } from '@core/services/blog/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleAuthor, ArticleContent } from '@ui-building/article/article.interface';
import { BlogPost } from '@core/models/blog/blog-post.model';
import { ArticleOutletComponent } from '@ui-building/article-outlet/article-outlet.component';

@Component({
  selector: 'app-blog-single',
  imports: [ArticleOutletComponent],
  templateUrl: './blog-single.page.html',
  styleUrl: './blog-single.page.scss'
})
export class BlogSinglePage implements OnInit {
  private readonly BLOG_SERVICE: BlogService = inject(BlogService);
  private readonly ROUTE: ActivatedRoute = inject(ActivatedRoute);
  private readonly ROUTER: Router = inject(Router);
  private readonly SANITIZER: DomSanitizer = inject(DomSanitizer);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ARTICLE_CONTENT: WritableSignal<ArticleContent | null> = signal<ArticleContent | null>(null);

  public readonly EXAMPLE_CONTENT: ArticleContent = {
    title: EXAMPLE_POST.title as string,
    excerpt: EXAMPLE_POST.excerpt as string,
    body: this.SANITIZER.bypassSecurityTrustHtml(EXAMPLE_POST.body) as SafeHtml,
    cover_image: this.BLOG_SERVICE.getCoverImageUrl(EXAMPLE_POST.cover_image) as string,
    published_at: this.BLOG_SERVICE.formatDate(EXAMPLE_POST.published_at) as string,
    author: { name: EXAMPLE_POST.author.name as string, } as ArticleAuthor,
    back_link: '/blog' as string,
    back_label: 'Back to Blog' as string,
  } as ArticleContent;

  public ngOnInit(): void {
    // TODO: swap to loadPost() when API is ready
    // const ID: number = Number(this.ROUTE.snapshot.paramMap.get('id'));
    // if (!ID) { this.ROUTER.navigate(['/error-404']); return; }
    // this.loadPost(ID);
  }

  public loadPost(id: number): void {
    this.LOADING.set(true);

    this.BLOG_SERVICE.getById(id).subscribe({
      next: (post: BlogPost) => {
        this.ARTICLE_CONTENT.set({
          title: post.title as string,
          excerpt: post.excerpt as string,
          body: this.SANITIZER.bypassSecurityTrustHtml(post.body) as SafeHtml,
          cover_image: this.BLOG_SERVICE.getCoverImageUrl(post.cover_image) as string,
          published_at: this.BLOG_SERVICE.formatDate(post.published_at) as string,
          author: { name: post.author.name as string, } as ArticleAuthor,
          back_link: '/blog' as string,
          back_label: 'Back to Blog' as string,
        } as ArticleContent);
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }
}
