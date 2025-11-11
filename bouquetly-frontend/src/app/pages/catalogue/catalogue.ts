import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Footer } from '../../components/footer/footer';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, ProductCard, Footer],
  templateUrl: './catalogue.html',
  styleUrls: ['./catalogue.css']
})
export class Catalogue implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }
}
