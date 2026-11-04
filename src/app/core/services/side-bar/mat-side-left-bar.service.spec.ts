import { TestBed } from '@angular/core/testing';

import { MatSideLeftBarService } from './mat-side-left-bar.service';

describe('MatSideLeftBar', () => {
  let service: MatSideLeftBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSideLeftBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
