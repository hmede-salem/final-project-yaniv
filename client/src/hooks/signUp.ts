import apiClient from '../services/api-client';

const signUp = async (data: object) => {
    let endpoint = `/register`;
   return apiClient
        .post(endpoint, data)
        .then(res =>  res)
       .catch(err => err)

}

export default signUp;