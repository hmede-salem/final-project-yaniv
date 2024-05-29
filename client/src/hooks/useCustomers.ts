import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Customer from "../entities/Customer";

const useCustomers = () => {
  let endpoint = `/customers`;
  let data = {
    role: sessionStorage.getItem("role"),
    token: sessionStorage.getItem("token"),
  };

  const fetchCustomers = () =>
    apiClient.post<Customer[]>(endpoint, data).then((res) => res.data);

  return useQuery<Customer[], Error>({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
};

export default useCustomers;
