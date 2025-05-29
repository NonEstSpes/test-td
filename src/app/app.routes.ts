import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/list-auto/list-auto').then((m) => m.ListAuto),
  },
];
