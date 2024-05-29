import apiClient from "../services/api-client";

const deleteCategory = async (catId: string) => {
  let endpoint = `/category?catId=${catId}`;

  return apiClient
    .delete(endpoint)
    .then((res) => res)
    .catch((err) => err);
};

export default deleteCategory;
