import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexInputComponent } from './flex-input.component';

describe('FlexInput', () => {
  let component: FlexInputComponent;
  let fixture: ComponentFixture<FlexInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
