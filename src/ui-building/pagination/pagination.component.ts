import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { PaginationContent } from './pagination.interface';
import { faArrowLeft, faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { IconFlexComponent } from '@shared/ui/icon-flex/icon-flex.component';



@Component({
  selector: 'app-pagination',
  imports: [
    NgClass,
    IconFlexComponent,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public readonly CONTENT: InputSignal<PaginationContent> = input.required<PaginationContent>();
  public readonly pageChange: OutputEmitterRef<number> = output<number>();

  public faArrowLeft!: IconDefinition;
  public faArrowRight!: IconDefinition;

  public readonly PAGES: Signal<number[]> = computed<number[]>(() => {
    const LAST: number = this.CONTENT().lastPage;
    return Array.from({ length: LAST }, (_, i) => i + 1);
  });

  constructor() {
    this.faArrowLeft = faArrowLeft;
    this.faArrowRight = faArrowRight;
  }

  public readonly HAS_PREV: Signal<boolean> = computed<boolean>(() => this.CONTENT().currentPage > 1);
  public readonly HAS_NEXT: Signal<boolean> = computed<boolean>(() => this.CONTENT().currentPage < this.CONTENT().lastPage);  

  public goTo(page: number): void {
    if (page < 1 || page > this.CONTENT().lastPage || page === this.CONTENT().currentPage) return;
    this.pageChange.emit(page);
  }

  public prev(): void {
    this.goTo(this.CONTENT().currentPage - 1);
  }

  public next(): void {
    this.goTo(this.CONTENT().currentPage + 1);
  }
}
