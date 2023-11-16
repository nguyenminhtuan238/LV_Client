import axios from 'axios';
const getUserToken = async () => {
    if(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
      return localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)
    }
};
const ApiServices = axios.create({
  baseURL: 'http://localhost:5000/',
});
ApiServices.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    } else {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ApiServices.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default ApiServices;
