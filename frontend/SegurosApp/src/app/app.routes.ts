import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'asegurados',
    loadComponent: () => import('./features/insureds/insured-list/insured-list.component').then(m => m.InsuredListComponent)
  },
  {
    path: 'asegurados/nuevo',
    loadComponent: () => import('./features/insureds/insured-form/insured-form.component').then(m => m.InsuredFormComponent)
  },
  {
    path: 'asegurados/:id/editar',
    loadComponent: () => import('./features/insureds/insured-form/insured-form.component').then(m => m.InsuredFormComponent)
  },
  {
    path: 'asegurados/:id',
    loadComponent: () => import('./features/insureds/insured-detail/insured-detail.component').then(m => m.InsuredDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
