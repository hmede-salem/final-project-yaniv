import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Product from "../entities/Product";

const useProducts = (searchText: string, selectedCategory: string) => {
  let endpoint = `/products?category=${selectedCategory}&searchText=${searchText}`;

  const fetchProducts = () =>
    apiClient
      .get(endpoint)
      .then((res) => res.data.data)
      .catch((err) => err);

  return useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory, searchText],
    queryFn: fetchProducts,
  });
};

export default useProducts;
