import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexFormComponent } from './flex-form.component';

describe('FlexForm', () => {
  let component: FlexFormComponent;
  let fixture: ComponentFixture<FlexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
