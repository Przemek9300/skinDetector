import { TestBed } from '@angular/core/testing';

import { SkinPredictService } from './skin-predict.service';

describe('SkinPredictService', () => {
  let service: SkinPredictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkinPredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
