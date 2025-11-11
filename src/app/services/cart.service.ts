import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: CartItem) {
    const existing = this.cartItems.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item, selected: true });
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getCart() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  updateSelection(id: number, selected: boolean) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.selected = selected;
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }
}
