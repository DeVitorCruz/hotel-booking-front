import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSingleOutletComponent } from './team-single-outlet.component';

describe('TeamSingleOutlet', () => {
  let component: TeamSingleOutletComponent;
  let fixture: ComponentFixture<TeamSingleOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSingleOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSingleOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
