import { TestBed } from '@angular/core/testing';

import { TopScorersService } from './top-scorers.service';

describe('TopScorersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopScorersService = TestBed.get(TopScorersService);
    expect(service).toBeTruthy();
  });
});
