import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFlex } from './img-flex.component';

describe('ImgFlex', () => {
  let component: ImgFlex;
  let fixture: ComponentFixture<ImgFlex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgFlex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgFlex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
