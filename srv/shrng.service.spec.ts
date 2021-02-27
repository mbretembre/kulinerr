import { TestBed } from '@angular/core/testing';

import { ShrngService } from './shrng.service';

describe('ShrngService', () => {
  let service: ShrngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShrngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
