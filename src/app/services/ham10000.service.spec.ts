import { TestBed } from '@angular/core/testing';

import { HAM10000Service } from './ham10000.service';

describe('HAM10000Service', () => {
  let service: HAM10000Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HAM10000Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
