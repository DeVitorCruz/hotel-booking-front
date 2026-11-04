import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorFlex } from './anchor-flex.component';

describe('AnchorFlex', () => {
  let component: AnchorFlex;
  let fixture: ComponentFixture<AnchorFlex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorFlex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorFlex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
