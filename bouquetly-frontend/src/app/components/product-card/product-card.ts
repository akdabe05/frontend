import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

addToCart(event: Event) {
  event.stopPropagation();

  const cartItem = {
    id: this.product.id,
    name: this.product.name,
    price: this.product.price,
    imageUrl: this.product.imageUrl || '',
    quantity: 1,
    selected: true
  };

  this.cartService.addToCart(cartItem);

  this.productService.incrementOrders(this.product.id).subscribe({
    next: () => {
      this.product.orders = (this.product.orders || 0) + 1;
    },
    error: (err) => console.error('Error updating orders count:', err)
  });
}
}
