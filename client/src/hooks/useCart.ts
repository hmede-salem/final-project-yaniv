// import apiClient from "../services/api-client";
// import { useQuery } from "@tanstack/react-query";
// import ICartItem from "../entities/ICartItem";

// const useCart = async () => {
//   let endpoint = `/customer/cart`;

//   const fetchCart = async () =>
//     apiClient
//       .get(endpoint)
//       .then((res) => res.data.data)
//       .catch((err) => err);

//   return useQuery<ICartItem[], Error>({
//     queryKey: ["cart"],
//     queryFn: fetchCart,
//     enabled: false,
//     refetchOnWindowFocus: false,
//   });
// };

// export default useCart;
