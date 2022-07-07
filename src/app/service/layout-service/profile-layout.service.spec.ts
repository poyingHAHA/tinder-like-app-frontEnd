import { TestBed } from '@angular/core/testing';

import { ProfileLayoutService } from './profile-layout.service';

describe('ProfileLayoutService', () => {
  let service: ProfileLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
