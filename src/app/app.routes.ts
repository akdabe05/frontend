import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogue } from './pages/catalogue/catalogue';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'catalogue', component: Catalogue },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '/home' }
];
