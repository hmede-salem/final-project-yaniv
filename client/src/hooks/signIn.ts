import apiClient from "../services/api-client";

const signIn = (data: object) => {
    let endpoint = `/login`;
   return apiClient
        .post(endpoint, data)
        .then(res =>  res)
       .catch(err => err)

}

export default signIn;