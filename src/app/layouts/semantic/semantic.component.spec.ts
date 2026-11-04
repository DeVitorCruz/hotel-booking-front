import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Semantic } from './semantic.component';

describe('Semantic', () => {
  let component: Semantic;
  let fixture: ComponentFixture<Semantic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Semantic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Semantic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
