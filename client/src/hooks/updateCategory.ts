import apiClient from "../services/api-client";

const updateCategory = async (newCatName: string, catId: string) => {
  let endpoint = `/category`;

  let data = { newCatName, catId };

  return apiClient
    .put(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default updateCategory;
