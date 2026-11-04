import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleOutletComponent } from './article-outlet.component';

describe('ArticleOutlet', () => {
  let component: ArticleOutletComponent;
  let fixture: ComponentFixture<ArticleOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
