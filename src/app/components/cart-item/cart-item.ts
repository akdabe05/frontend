import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.css'],
})
export class CartItem {
  @Input() item!: {
    id: number;
    name: string;
    imageUrl: string;
    modification?: string;
    quantity: number;
    price: number;
    selected?: boolean;
  };

  @Output() remove = new EventEmitter<number>();
  @Output() quantityChange = new EventEmitter<{ id: number; quantity: number }>();
  @Output() selectionChange = new EventEmitter<{ id: number; selected: boolean }>();

  onRemove() {
    this.remove.emit(this.item.id);
  }

  increaseQty() {
    this.item.quantity++;
    this.quantityChange.emit({ id: this.item.id, quantity: this.item.quantity });
  }

  decreaseQty() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.quantityChange.emit({ id: this.item.id, quantity: this.item.quantity });
    }
  }

  toggleSelection(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.item.selected = checked;
    this.selectionChange.emit({ id: this.item.id, selected: checked });
  }
}
