import apiClient from "../services/api-client";

const modifyCartItem = async (productId: string, implementation: string) => {
  let endpoint = `/customer/cart/${implementation}/${productId}`;

  return apiClient
    .put(endpoint)
    .then((res) => res)
    .catch((err) => err);
};

export default modifyCartItem;
