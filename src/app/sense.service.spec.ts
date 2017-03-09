import { TestBed, inject } from '@angular/core/testing';

import { SenseService } from './sense.service';

describe('SenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SenseService]
    });
  });

  it('should ...', inject([SenseService], (service: SenseService) => {
    expect(service).toBeTruthy();
  }));
});
