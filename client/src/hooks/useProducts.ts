import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Product from "../entities/Product";

const useProducts = (searchText: string, selectedCategory: string) => {
  const fetchProducts = async () => {
    const endpoint = `/products?category=${selectedCategory}&searchText=${searchText}`;
    return apiClient.get(endpoint).then((res) => res.data.data);
  };

  const query = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory, searchText],
    queryFn: fetchProducts,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};

export default useProducts;
