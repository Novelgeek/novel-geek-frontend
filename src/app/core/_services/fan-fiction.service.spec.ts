import { TestBed } from '@angular/core/testing';

import { FanFictionService } from './fan-fiction.service';

describe('FanFictionService', () => {
  let service: FanFictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanFictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
