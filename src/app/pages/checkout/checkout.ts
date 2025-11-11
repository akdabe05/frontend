import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  isSubmitting = false;
  
  customerDetails = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
    notes: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.filter(item => item.selected);
      
      if (this.cartItems.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder() {
    if (this.validateForm() && !this.isSubmitting) {
      this.isSubmitting = true;

      const orderData = {
        customer: this.customerDetails,
        items: this.cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: this.getTotal()
      };

      console.log('📦 Sending order data:', orderData);

      this.orderService.createOrder(orderData).subscribe({
        next: (response) => {
          console.log('✅ Order created:', response);
          alert(`Order placed successfully! 🎉\nOrder ID: ${response.orderId}`);
          
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('❌ Full error details:', err);
          console.error('❌ Error status:', err.status);
          console.error('❌ Error message:', err.message);
          console.error('❌ Error body:', err.error);
          
          let errorMessage = 'Failed to place order. Please try again.';
          if (err.error && err.error.error) {
            errorMessage = `Error: ${err.error.error}`;
          } else if (err.status === 0) {
            errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
          }
          
          alert(errorMessage);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.customerDetails.fullName) {
      alert('Please enter your full name');
      return false;
    }
    if (!this.customerDetails.email) {
      alert('Please enter your email');
      return false;
    }
    if (!this.customerDetails.phone) {
      alert('Please enter your phone number');
      return false;
    }
    if (!this.customerDetails.address) {
      alert('Please enter your address');
      return false;
    }
    return true;
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel?')) {
      this.router.navigate(['/cart']);
    }
  }
}
