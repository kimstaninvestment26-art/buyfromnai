export interface Product {
  _id: string;
  name: string;
  price: number | null;
  image: string;
  description: string;
  availability: boolean;
  category: 'Food' | 'Fashion' | 'Electronics' | 'Other';
  whatsappNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number | null;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  whatsappMessage: string;
  orderDate: string;
  updatedAt: string;
}