import { TestBed } from '@angular/core/testing';

import { HeadToHeadService } from './head-to-head.service';

describe('HeadToHeadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadToHeadService = TestBed.get(HeadToHeadService);
    expect(service).toBeTruthy();
  });
});
