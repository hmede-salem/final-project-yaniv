// import apiClient from "../services/api-client";
// import { useQuery } from "@tanstack/react-query";
// import Category from "../entities/Category";

// const useCategories = () => {
//   const fetchCategories = () =>
//     apiClient
//       .get("/categories")
//       .then((res) => res.data.data)
//       .catch((err) => err);

//   return useQuery<Category[], Error>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });
// };

// export default useCategories;
