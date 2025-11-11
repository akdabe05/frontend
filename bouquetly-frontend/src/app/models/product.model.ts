export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  category_id?: number;
  ordersCount?: number;  // Changed to match backend camelCase
  orders_count?: number; // Keep for backward compatibility
  orders?: number;
}
