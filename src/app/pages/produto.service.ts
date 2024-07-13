import { Injectable, Injector } from '@angular/core';
import { Observable, take } from 'rxjs';
import { BaseResourceService } from '../shared/classes/base-resource/base-resource.service';
import { EApiInfo, EApiPath } from '../shared/enums/apis/api-info.enum';
import { IResponse } from '../shared/interfaces/find-all-response.interface';
import { ILoja, IProduto, IProdutoLoja } from './produto/produto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseResourceService<IProduto> {
  constructor(protected readonly _injectorProduto: Injector) {
    super(_injectorProduto, EApiPath.PRODUTO);
  }

  findProdutoLoja(pId: number): Observable<IResponse<IProdutoLoja[]>> {
    return this._http
      .get<
        IResponse<IProdutoLoja[]>
      >(`${EApiInfo.BASE_URL}${EApiPath.PRODUTO}/${EApiPath.PRODUTO_LOJA}/${pId}`)
      .pipe(take(1));
  }

  findAllLoja(): Observable<IResponse<ILoja[]>> {
    return this._http
      .get<IResponse<ILoja[]>>(`${EApiInfo.BASE_URL}loja`)
      .pipe(take(1));
  }

  findImagem(pId: number): Observable<IResponse<string>> {
    return this._http
      .get<
        IResponse<string>
      >(`${EApiInfo.BASE_URL}${EApiPath.PRODUTO}/${EApiPath.IMAGEM}/${pId}`)
      .pipe(take(1));
  }
}
