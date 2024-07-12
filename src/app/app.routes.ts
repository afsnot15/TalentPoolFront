import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages/pages.component';
import { pagesRoutes } from './pages/pages/pages.routes';
import { EPageRoutes } from './shared/enums/routes/routes.enum';

export const routes: Routes = [
  {
    path: EPageRoutes.ROOT,
    component: PagesComponent,
    children: pagesRoutes,
  },

  {
    path: EPageRoutes.NOT_FOUND,
    component: NotFoundComponent,
  },

  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];
