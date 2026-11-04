import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCollectionComponent } from './flex-collection.component';

describe('FlexCollection', () => {
  let component: FlexCollectionComponent;
  let fixture: ComponentFixture<FlexCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
