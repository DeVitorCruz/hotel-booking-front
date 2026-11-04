import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFlexComponent } from './icon-flex.component';

describe('IconFlex', () => {
  let component: IconFlexComponent;
  let fixture: ComponentFixture<IconFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFlexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
