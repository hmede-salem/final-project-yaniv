import apiClient from "../services/api-client";

const addCategory = async (newCategoryName: string) => {
  let endpoint = `/category`;
  let data = { newCategoryName };

  return apiClient
    .post(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default addCategory;
