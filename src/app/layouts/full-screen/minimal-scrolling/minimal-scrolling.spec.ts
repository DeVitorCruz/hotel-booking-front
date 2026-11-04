import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalScrolling } from './minimal-scrolling';

describe('MinimalScrolling', () => {
  let component: MinimalScrolling;
  let fixture: ComponentFixture<MinimalScrolling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalScrolling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalScrolling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
