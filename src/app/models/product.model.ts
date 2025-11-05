export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  category_id?: number;
  orders_count?: number;
  orders?: number;
}
