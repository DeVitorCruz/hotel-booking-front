import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFlex } from './button.component';

describe('Button-flex', () => {
  let component: ButtonFlex;
  let fixture: ComponentFixture<ButtonFlex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFlex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFlex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
