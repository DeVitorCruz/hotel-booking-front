import { Component, computed, input, InputSignal, Signal, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ArticleContent } from '@ui-building/article/article.interface';
import { ArticleTemplate, ARTICLE_REGISTRY } from '@ui-building/article/article.registry';

@Component({
  selector: 'app-article-outlet',
  imports: [NgComponentOutlet],
  template: `
    <ng-container
      *ngComponentOutlet="
        RESOLVED_COMPONENT();
        inputs: { CONTENT: CONTENT() }">
    </ng-container>
  `,
})
export class ArticleOutletComponent {
  public readonly CONTENT: InputSignal<ArticleContent> = input.required<ArticleContent>();
  public readonly template: InputSignal<ArticleTemplate> = input<ArticleTemplate>('default');

  public readonly RESOLVED_COMPONENT: Signal<Type<any>> = computed<Type<any>>(() => 
    ARTICLE_REGISTRY[this.template()] ?? ARTICLE_REGISTRY['default']
  );
}
