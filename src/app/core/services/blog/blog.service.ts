import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, BlogPagination } from '@core/models/blog/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends ApiService {
  private readonly STORAGE_URL: string = 'https://ecommerce-blog.devitor.local/storage/';
  
  constructor(http: HttpClient) { super(http); }

  public getAll(page: number = 1, search?: string): Observable<BlogPagination> {
    const PARAMS: Record<string, string | number> = { page };
    if (search) PARAMS['search'] = search;
    return this.http.get<BlogPagination>('blogs', PARAMS);
  }

  public getById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`blogs/${id}`);
  }

  public getCoverImageUrl(coverImage: string | null): string {
    if (!coverImage) return 'assets/collection-info/blog-big-1-1.jpg';
    return `${this.STORAGE_URL}${coverImage}`;
  }

  public formatDate(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }
}
