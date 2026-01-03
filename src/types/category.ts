export interface Category {
  id: string;
  name: string;
  order: number;
  products: Product[]; // المنتجات داخل هذا القسم
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  sizes: Size[];
  extras: Extra[];
}

export interface Size {
  id: string;
  name: string; // SMALL, MEDIUM, LARGE
  price: number;
}

export interface Extra {
  id: string;
  name: string; // CHEESE, BACON, ...
  price: number;
}
