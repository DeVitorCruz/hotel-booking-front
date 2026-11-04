import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBindRoute } from './banner-bind-route';

describe('BannerBindRoute', () => {
  let component: BannerBindRoute;
  let fixture: ComponentFixture<BannerBindRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerBindRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerBindRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
