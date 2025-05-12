import { TestBed } from '@angular/core/testing';

import { AppsrvService } from './appsrv.service';

describe('AppsrvService', () => {
  let service: AppsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
