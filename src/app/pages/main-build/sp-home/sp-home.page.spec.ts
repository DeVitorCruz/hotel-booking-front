import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpHome } from './sp-home.page';

describe('SpHome', () => {
  let component: SpHome;
  let fixture: ComponentFixture<SpHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
