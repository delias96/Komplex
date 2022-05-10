import { TestBed } from '@angular/core/testing';

import { Token.StorageService } from './token.storage.service';

describe('Token.StorageService', () => {
  let service: Token.StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Token.StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
