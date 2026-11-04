import { Component, input, InputSignal } from '@angular/core';
import { ArticleContent } from './article.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  public readonly CONTENT: InputSignal<ArticleContent> = input.required<ArticleContent>();
}
