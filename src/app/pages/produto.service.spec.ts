import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PageEvent } from '@angular/material/paginator';
import { IResponse } from '../shared/interfaces/find-all-response.interface';
import { ProdutoService } from './produto.service';
import { IProduto, IProdutoLoja } from './produto/produto.interface';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProdutoService],
    });
    service = TestBed.inject(ProdutoService);
  });

  it('testando created', () => {
    expect(service).toBeTruthy();
  });

  describe('POST create produto', () => {
    it('deve realizar um post para criar o produto', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const produto = {
          id: 1,
          descricao: 'Produto 1',
          custo: 10,
          imagem: 'imagem',
        };

        const mockResponse = { data: produto, message: 'ok', count: 2 };

        produtoService
          .create(produto)
          .subscribe((response: IResponse<IProduto>) => {
            expect(response.data).toEqual(produto);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('GET produtoloja', () => {
    it('deve realizar um get para em produtoloja', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const produtoLoja = [
          {
            idProduto: 1,
            idLoja: 1,
            precoVenda: 10,
            loja: {
              id: 1,
              descricao: 'Loja 01',
            },
          },
          {
            idProduto: 1,
            idLoja: 2,
            precoVenda: 15,
            loja: {
              id: 1,
              descricao: 'Loja 02',
            },
          },
        ];

        const mockResponse = { data: produtoLoja, message: 'ok', count: 2 };

        produtoService
          .findProdutoLoja(1)
          .subscribe((response: IResponse<IProdutoLoja[]>) => {
            expect(response.data).toEqual(produtoLoja);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/produtoloja/1',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('GET findImagem', () => {
    it('deve realizar um get para em imagem', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const bytea = new Uint8Array(10);

        const mockResponse = { data: bytea, message: 'ok', count: 2 };

        produtoService
          .findImagem(1)
          .subscribe((response: IResponse<Uint8Array>) => {
            expect(response.data).toEqual(bytea);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/imagem/1',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('GET findALL', () => {
    it('deve realizar um get para em imagem', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const mockResponse = {
          data: [{ id: 1, descricao: 'Teste' }],
          message: 'ok',
          count: 2,
        };

        const page = new PageEvent();
        page.pageSize = 10;
        page.pageIndex = 0;

        const filter: Record<string, unknown> = {
          nome: 'Teste',
          idade: 30,
          ativo: true,
        };

        produtoService
          .findAll(page, { active: 'id', direction: 'asc' }, filter)
          .subscribe((response: IResponse<IProduto[]>) => {
            expect(response.data).toEqual(response.data);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/0/10/{"column":"id","sort":"asc"}?filter=[{"column":"nome","value":"Teste"},{"column":"idade","value":30},{"column":"ativo","value":true}]',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('Patch produto', () => {
    it('deve realizar um patch para atualizar o produto', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const produto = {
          id: 1,
          descricao: 'Produto 1',
          custo: 10,
          imagem: 'imagem',
        };

        const mockResponse = { data: produto, message: 'ok', count: 2 };

        produtoService
          .updateById(1, produto)
          .subscribe((response: IResponse<IProduto>) => {
            expect(response.data).toEqual(produto);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/1',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('GET findOneById', () => {
    it('deve realizar um get de um produto apenas', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        const produto = {
          id: 1,
          descricao: 'Produto 1',
          custo: 10,
          imagem: 'imagem',
        };

        const mockResponse = { data: produto, message: 'ok', count: 2 };

        produtoService
          .findOneById(1)
          .subscribe((response: IResponse<IProduto>) => {
            expect(response.data).toEqual(produto);
          });

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/1',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });

  describe('DELETE delete', () => {
    it('deve realizar um get de um produto apenas', inject(
      [HttpTestingController, ProdutoService],
      (httpMock: HttpTestingController, produtoService: ProdutoService) => {
        produtoService.delete(1).subscribe((response: IResponse<boolean>) => {
          expect(response.data).toEqual(true);
        });

        const mockResponse = { data: true, message: 'ok', count: 2 };

        const mockReq = httpMock.expectOne(
          'http://127.0.0.1:3000/api/v1/produto/1',
        );

        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockResponse);

        httpMock.verify();
      },
    ));
  });
});
