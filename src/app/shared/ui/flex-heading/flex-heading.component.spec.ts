import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexHeadingComponent } from './flex-heading.component';

describe('FlexHeading', () => {
  let component: FlexHeadingComponent;
  let fixture: ComponentFixture<FlexHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
