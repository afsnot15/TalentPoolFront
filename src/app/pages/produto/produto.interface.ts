import { FormControl } from '@angular/forms';

export interface IProdutoLoja {
  idProduto: number;
  idLoja: number;
  precoVenda: number;
  loja: ILoja;
}

export interface IProdutoImageResponse {
  type: string;
  data: number[];
}

export interface ILoja {
  id: number;
  descricao: string;
}

export interface IProduto {
  id: number;
  descricao: string;
  custo: number;
  imagem?: string;
}

export interface IProdutoForm {
  id: FormControl<number | null>;
  descricao: FormControl<string | null>;
  custo: FormControl<number | null>;
  precoVenda?: FormControl<number | null>;
  produtoLoja?: FormControl<IProdutoLoja[] | null>;
  imagem?: FormControl<string | null>;
}
