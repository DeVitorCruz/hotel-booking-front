import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSingleComponent } from './team-single.component';

describe('TeamSingle', () => {
  let component: TeamSingleComponent;
  let fixture: ComponentFixture<TeamSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
