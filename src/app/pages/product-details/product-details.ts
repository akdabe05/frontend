import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product!: Product;
  safeImageUrl: string = '/assets/images/fallback.png';
  selectedAddOns: string[] = [];
  totalPrice: number = 0;

  addOns = [
    { name: 'Teddy Bear', price: 500 },
    { name: 'Chocolates', price: 350 },
    { name: 'Balloon Set', price: 200 }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
next: (data) => {
  this.product = data;
  const imagePath = data.imageUrl || data.image;
  this.safeImageUrl = this.resolveImageUrl(data.imageUrl || data.image || '');
  this.totalPrice = data.price;

  console.log('Resolved image URL:', this.safeImageUrl);
},

      error: (err: any) => console.error('Error fetching product:', err)
    });
  }

  resolveImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/images/fallback.png';

    if (imagePath.startsWith('/assets/')) return imagePath.substring(1);
    if (imagePath.startsWith('assets/')) return imagePath;
    if (imagePath.startsWith('./assets/')) return imagePath.replace('./', '');

    return `assets/images/products/${imagePath}`;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/images/fallback.png';
  }

  toggleAddOn(addOn: any, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedAddOns.push(addOn.name);
      this.totalPrice += addOn.price;
    } else {
      this.selectedAddOns = this.selectedAddOns.filter(a => a !== addOn.name);
      this.totalPrice -= addOn.price;
    }
  }

addToCart(): void {
  if (!this.product) return;

  this.cartService.addToCart({
    id: this.product.id,
    name: this.product.name,
    price: this.totalPrice,
    quantity: 1,
    imageUrl: this.safeImageUrl,
    selected: true
  });

  alert(`${this.product.name} has been added to your cart! 🎉`);
}

}
