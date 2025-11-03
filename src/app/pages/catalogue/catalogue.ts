import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, ProductCard, Footer],
  templateUrl: './catalogue.html',
  styleUrls: ['./catalogue.css']
})
export class Catalogue {
  products = [
    {
      name: 'Peony Bloom',
      price: 1590,
      image: 'assets/images/products/peony_bloom.png',
      orders: 473
    },
    {
      name: 'Wild Garden',
      price: 1550,
      image: 'assets/images/products/wild_garden.png',
      orders: 389
    },
    {
      name: 'Fiesta Charm',
      price: 1650,
      image: 'assets/images/products/fiesta_charm.png',
      orders: 512
    },
    {
      name: 'Petal Whisper',
      price: 1450,
      image: 'assets/images/products/petal_whisper.png',
      orders: 403
    }
  ];
}
