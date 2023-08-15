export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  reviews?: Review[];
};

export type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
};
