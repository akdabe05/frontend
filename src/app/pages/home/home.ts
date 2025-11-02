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
bestSellers = [
  { name: 'Petal Whisper', price: 1450, image: 'assets/images/products/petal-whisper.png' },
  { name: 'Woven Heart', price: 1700, image: 'assets/images/products/woven-heart.png' },
  { name: 'Wild Garden', price: 1550, image: 'assets/images/products/wild-garden.png' },
  { name: 'Fiesta Charm', price: 1650, image: 'assets/images/products/fiesta-charm.png' }
];
}
