import { Component, input, InputOptionsWithoutTransform, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { ReviewPanelContent } from './review-card.interface';
import { FlexFormItem } from '@shared/ui/flex-form/flex-form-item.interface';
import { REVIEW_FORM } from './REVIEW_FORM';
import { ImgFlex } from '@shared/ui/img-flex/img-flex.component';
import { NgClass } from '@angular/common';
import { FlexFormComponent } from '@shared/ui/flex-form/flex-form.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [NgClass, ImgFlex, FlexFormComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements OnInit {
  public readonly CONTENT: InputSignal<ReviewPanelContent> = input.required<ReviewPanelContent>();
  public readonly RATING: WritableSignal<number> = signal<number>(0);
  public readonly STARS: number[] = [1, 2, 3, 4, 5];
  public readonly REVIEW_FORM!: FlexFormItem;
  public readonly REVIEW_DATA!: {
    email: string;
    comment: string;
    rating: number;
  };

  constructor() {   
    this.REVIEW_DATA = {
      email: '',
      comment: '',
      rating: 0,
    };
    this.REVIEW_FORM = REVIEW_FORM;
  }

  public ngOnInit(): void {
    this.REVIEW_FORM.fields[0].onValueChange = (v: string) => this.REVIEW_DATA.email = v;
    this.REVIEW_FORM.fields[1].onValueChange = (v: string) => this.REVIEW_DATA.comment = v;
  }
  
  public setRating(star: number): void {
    this.RATING.set(star);
    this.REVIEW_DATA.rating = star;
  }

  public isStarActive(star: number): boolean {
    return star <= this.RATING();
  }

  public onSubmit(): void {
    // TODO: wire to ReviewService once backend endpoint is ready
    console.log('Review submitted:', {
      productId: this.CONTENT().productId,
      ...this.REVIEW_DATA,
    });
  }
}
