import apiClient from "../services/api-client";

const signIn = async (data: object) => {
  let endpoint = `/login`;
  return apiClient
    .post(endpoint, data)
    .then((res) => res)
    .catch((err) => err);
};

export default signIn;
