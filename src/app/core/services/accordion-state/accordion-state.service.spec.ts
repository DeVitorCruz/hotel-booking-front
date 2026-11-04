import { TestBed } from '@angular/core/testing';

import { AccordionStateService } from './accordion-state.service';

describe('AccordionState', () => {
  let service: AccordionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccordionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
