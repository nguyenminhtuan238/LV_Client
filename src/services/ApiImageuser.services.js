import axios from 'axios';
const getTeacherToken = async () => {
  if(localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)){
    return localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN)
  }
  
};
const ApiImageuser = axios.create({
  baseURL: 'http://localhost:5000/',
});
ApiImageuser.interceptors.request.use(
  async (config) => {
    const token = await getTeacherToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
    } else {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ApiImageuser.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default ApiImageuser;
