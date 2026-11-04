import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSpaceComponent } from './sequence-space.component';

describe('SequenceSpace', () => {
  let component: SequenceSpaceComponent;
  let fixture: ComponentFixture<SequenceSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
