import { Routes } from '@angular/router';
import { EPageRoutes } from '../../shared/enums/routes/routes.enum';
import { ProdutoConsultaComponent } from '../produto/produto-consulta/produto-consulta.component';
import { produtoRoutes } from '../produto/produto.routes';

export const pagesRoutes: Routes = [
  {
    path: EPageRoutes.ROOT,
    component: ProdutoConsultaComponent,
  },

  ...produtoRoutes,
];
