import { TestBed, inject } from '@angular/core/testing';

import { TransporteServiceService } from './transporte-service.service';

describe('TransporteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransporteServiceService]
    });
  });

  it('should be created', inject([TransporteServiceService], (service: TransporteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
