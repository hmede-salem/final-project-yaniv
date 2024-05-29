import apiClient from "../services/api-client";

const deleteCartItem = async (productId: string) => {
  let endpoint = `/customer/cart/delete/${productId}`;
  return apiClient
    .delete(endpoint)
    .then((res) => res)
    .catch((err) => err);
};

export default deleteCartItem;
