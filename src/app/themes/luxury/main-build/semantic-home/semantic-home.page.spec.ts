import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticHome } from './semantic-home.page';

describe('SemanticHome', () => {
  let component: SemanticHome;
  let fixture: ComponentFixture<SemanticHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanticHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanticHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
