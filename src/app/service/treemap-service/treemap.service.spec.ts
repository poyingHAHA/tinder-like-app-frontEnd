import { TestBed } from '@angular/core/testing';

import { TreemapService } from './treemap.service';

describe('TreemapService', () => {
  let service: TreemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
