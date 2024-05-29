import Product from "../entities/Product";
import apiClient from "../services/api-client";

const addProduct = async (product: Product) => {
  let endpoint = `/product/add`;
  let data = { product: product};

  return apiClient
    .post(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default addProduct;
