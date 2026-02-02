import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { EmisionFacturas } from './pages/emision-facturas/emision-facturas';
import { AuthGuard } from './guards/auth.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: 'facturas', component: EmisionFacturas },
      { path: '', redirectTo: 'facturas', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
