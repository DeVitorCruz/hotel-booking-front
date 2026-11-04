import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleOutletComponent } from './product-single-outlet.component';

describe('ProductSingleOutlet', () => {
  let component: ProductSingleOutletComponent;
  let fixture: ComponentFixture<ProductSingleOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingleOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingleOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
