import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCardComponent } from './flex-card.component';

describe('FlexCard', () => {
  let component: FlexCardComponent;
  let fixture: ComponentFixture<FlexCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
