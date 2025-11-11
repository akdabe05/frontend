import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogue } from './pages/catalogue/catalogue';
import { Cart } from './pages/cart/cart';
import { ProductDetails } from './pages/product-details/product-details';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'catalogue', component: Catalogue },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'product/:id', component: ProductDetails },
  { path: '**', redirectTo: '/home' }
];
