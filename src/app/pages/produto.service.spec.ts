import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProdutoService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutoService;

  const httpMock: Partial<HttpClient> = {
    get: () => of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
