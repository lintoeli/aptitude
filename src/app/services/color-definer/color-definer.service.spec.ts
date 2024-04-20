import { TestBed } from '@angular/core/testing';

import { ColorDefinerService } from './color-definer.service';

describe('ColorDefinerService', () => {
  let service: ColorDefinerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorDefinerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
