import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../../components/footer/footer';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Footer, ProductCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  heroImages: string[] = [
  'assets/images/home_top.png',
  'assets/images/home_top2.png',
  'assets/images/home_top3.png'
];

currentIndex = 0;
intervalId: any;

ngOnInit() {
  this.startCarousel();
}

startCarousel() {
  this.intervalId = setInterval(() => {
    this.nextImage();
  }, 4000);
}

nextImage() {
  this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;
}

prevImage() {
  this.currentIndex =
    (this.currentIndex - 1 + this.heroImages.length) % this.heroImages.length;
}

ngOnDestroy() {
  clearInterval(this.intervalId);
}


bestSellers = [
  { name: 'Petal Whisper', price: 1450, image: 'assets/images/products/petal_whisper.png' },
  { name: 'Woven Heart', price: 1700, image: 'assets/images/products/woven_heart.png' },
  { name: 'Wild Garden', price: 1550, image: 'assets/images/products/wild_garden.png' },
  { name: 'Fiesta Charm', price: 1650, image: 'assets/images/products/fiesta_charm.png' }
];
}
