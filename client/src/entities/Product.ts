import Category from "./Category";

export default interface Product {
  id: string;
  title: string;
  description: string;
  details: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: Category | string;
  images: string[];
  sold: number;
  type: string;
  _id: string;
}

export const newProduct = {
  id: crypto.randomUUID(),
  title: "",
  description: "",
  details: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  images: [""],
  sold: 0,
  type: "",
};
