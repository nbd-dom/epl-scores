import { TestBed } from '@angular/core/testing';

import { UpcomingMatchesService } from './upcoming-matches.service';

describe('UpcomingMatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpcomingMatchesService = TestBed.get(UpcomingMatchesService);
    expect(service).toBeTruthy();
  });
});
