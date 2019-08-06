import { TestBed } from '@angular/core/testing';

import { ControlSequenceService } from './control-sequence.service';

describe('ControlSequenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlSequenceService = TestBed.get(ControlSequenceService);
    expect(service).toBeTruthy();
  });
});
