import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqContactComponent } from './faq-contact';

describe('FaqContact', () => {
  let component: FaqContactComponent;
  let fixture: ComponentFixture<FaqContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
