import apiClient from "../services/api-client";

const updateCategory = async (
  newCatName: string,
  imageUrl: string,
  catId: string
) => {
  let endpoint = `/category`;

  let data = { newCatName, catId, imageUrl };

  return apiClient
    .put(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default updateCategory;
