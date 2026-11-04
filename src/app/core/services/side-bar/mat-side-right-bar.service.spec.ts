import { TestBed } from '@angular/core/testing';

import { MatSideRightBarService } from './mat-side-right-bar.service';

describe('MatSideRightBar', () => {
  let service: MatSideRightBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSideRightBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
