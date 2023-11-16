import axios from 'axios';
const getTeacherToken = async () => {
  if(localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)){
  
    return localStorage.getItem(process.env.NEXT_PUBLIC_TEACHERTOKEN)
  }
  
};
const ApiteacherServices = axios.create({
  baseURL: 'http://localhost:5000/',
});
ApiteacherServices.interceptors.request.use(
  async (config) => {
    const token = await getTeacherToken();
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

ApiteacherServices.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default ApiteacherServices;
