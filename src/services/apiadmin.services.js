import axios from 'axios';
const getAdminToken = async () => {
  if(localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)){
    return localStorage.getItem(process.env.NEXT_PUBLIC_ADMINTOKEN)
  }
  
};
const ApiadminServices = axios.create({
  baseURL: 'http://localhost:5000/',
});
ApiadminServices.interceptors.request.use(
  async (config) => {
    const token = await getAdminToken();
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

ApiadminServices.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default ApiadminServices;
