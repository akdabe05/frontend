import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderRequest {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
    notes: string;
  };
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

export interface OrderResponse {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  specialNotes: string;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, orderData);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}
