import { TestBed } from '@angular/core/testing';

import { TinderLayoutService } from './tinder-layout.service';

describe('TinderLayoutService', () => {
  let service: TinderLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinderLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
