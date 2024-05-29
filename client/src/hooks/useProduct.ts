import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Product from "../entities/Product";

const useProduct = (id: string) => {
  let endpoint = `/products/${id}`;

  const fetchProduct = () =>
    apiClient
      .get(endpoint)
      .then((res) => res.data.data)
      .catch((err) => err);

  return useQuery<Product, Error>({
    queryKey: ["products", id],
    queryFn: fetchProduct,
  });
};

export default useProduct;
