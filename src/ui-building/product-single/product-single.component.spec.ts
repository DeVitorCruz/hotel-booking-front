import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleComponent } from './product-single.component';

describe('ProductSingle', () => {
  let component: ProductSingleComponent;
  let fixture: ComponentFixture<ProductSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
