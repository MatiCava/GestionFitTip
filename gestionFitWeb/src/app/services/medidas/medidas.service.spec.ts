import { TestBed, inject } from '@angular/core/testing';

import { MedidasService } from './medidas.service';

describe('MedidasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedidasService]
    });
  });

  it('should be created', inject([MedidasService], (service: MedidasService) => {
    expect(service).toBeTruthy();
  }));
});
