import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../components/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItem],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  cartItems = [
    { id: 1, name: 'GENTLE HEART', image: 'assets/images/products/gentle_heart.png', modification: 'None', quantity: 1, price: 899, selected: true },
    { id: 2, name: 'PETAL WHISPER', image: 'assets/images/products/petal_whisper.png', modification: 'Ribbon Wrap', quantity: 2, price: 1299, selected: true },
  ];

  selectAll = true;

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
    this.recomputeSelectAll();
  }

  onQuantityChange(payload: { id: number; quantity: number }) {
    const item = this.cartItems.find(i => i.id === payload.id);
    if (item) item.quantity = payload.quantity;
  }

  onSelectionChange(payload: { id: number; selected: boolean }) {
    const item = this.cartItems.find(i => i.id === payload.id);
    if (item) item.selected = payload.selected;
    this.recomputeSelectAll();
  }

  toggleSelectAll(ev: Event) {
    this.selectAll = (ev.target as HTMLInputElement).checked;
    this.cartItems = this.cartItems.map(i => ({ ...i, selected: this.selectAll }));
  }

  recomputeSelectAll() {
    this.selectAll = this.cartItems.length > 0 && this.cartItems.every(i => i.selected);
  }

  deleteSelected() {
    this.cartItems = this.cartItems.filter(i => !i.selected);
    this.recomputeSelectAll();
  }

  hasSelected(): boolean {
    return this.cartItems.some(i => i.selected);
  }

  getSelectedTotal(): number {
    return this.cartItems
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  /** 🟢 NEW: Getter to return number of selected items for template */
  get selectedCount(): number {
    return this.cartItems.filter(i => i.selected).length;
  }
}