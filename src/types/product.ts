export interface Product {
  id: string;
  name: string;
  desc?: string;
  price: number;
  ingredients: string,
  weight?: number;
  categories?: string;
  imgSrc: string;
  rating: number;
}