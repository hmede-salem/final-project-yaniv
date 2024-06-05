import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Order from "../entities/Order";

const useOrders = () => {
  let endpoint = `/customer/order`;

  const fetchOrders = async () =>
    apiClient
      .get(endpoint)
      .then((res) => res.data.data)
      .catch((err) => err);

  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};

export default useOrders;
