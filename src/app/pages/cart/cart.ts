import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem as CartItemModel } from '../../services/cart.service';
import { CartItem } from '../../components/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItem],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems: CartItemModel[] = [];
  selectAll = true;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.recomputeSelectAll();
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  toggleSelectAll(ev: Event) {
    this.selectAll = (ev.target as HTMLInputElement).checked;
    this.cartItems.forEach(item => {
      this.cartService.updateSelection(item.id, this.selectAll);
    });
  }

  recomputeSelectAll() {
    this.selectAll = this.cartItems.length > 0 && this.cartItems.every(i => i.selected);
  }

  deleteSelected() {
    this.cartItems
      .filter(i => i.selected)
      .forEach(i => this.cartService.removeFromCart(i.id));
  }

  hasSelected(): boolean {
    return this.cartItems.some(i => i.selected);
  }

  getSelectedTotal(): number {
    return this.cartItems
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get selectedCount(): number {
    return this.cartItems.filter(i => i.selected).length;
  }

  onQuantityChange(event: { id: number; quantity: number }) {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  onSelectionChange(event: { id: number; selected: boolean }) {
    this.cartService.updateSelection(event.id, event.selected);
    this.recomputeSelectAll();
  }

  proceedToCheckout() {
    if (this.hasSelected()) {
      this.router.navigate(['/checkout']);
    } else {
      alert('Please select at least one item to checkout');
    }
  }
}
