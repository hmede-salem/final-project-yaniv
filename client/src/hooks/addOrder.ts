import apiClient from "../services/api-client";

const addOrder = async () => {
  let endpoint = `/customer/order/add`;

  return apiClient
    .post(endpoint)
    .then((res) => res)
    .catch((err) => err);
};

export default addOrder;
