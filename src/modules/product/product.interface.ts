export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  reviews?: Review[];
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
}
