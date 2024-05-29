import Product from "../entities/Product";
import apiClient from "../services/api-client";

const updateProduct = async (product: Product) => {
  let endpoint = `/products/${product.id}/update`;
  let data = { product: product, token: sessionStorage.getItem("token") };

  return apiClient
    .post(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default updateProduct;
