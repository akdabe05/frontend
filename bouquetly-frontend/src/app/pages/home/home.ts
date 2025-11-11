import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Footer, ProductCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {
  bestSellers: Product[] = [];
  heroImages: string[] = [
    'assets/images/home_top.png',
    'assets/images/home_top2.png',
    'assets/images/home_top3.png'
  ];
  currentIndex = 0;
  intervalId: any;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.startCarousel();
    this.loadBestSellers();
  }

  loadBestSellers() {
    this.productService.getTopProducts()
      .subscribe({
        next: (products) => {
          this.bestSellers = products.map(p => ({
            ...p,
            orders_count: p.ordersCount || p.orders_count  // Map backend ordersCount to frontend field
          }));
        },
        error: (err) => {
          console.error('Error loading products:', err);
        }
      });
  }

  startCarousel() {
    this.intervalId = setInterval(() => this.nextImage(), 4000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex === 0)
      ? this.heroImages.length - 1
      : this.currentIndex - 1;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
