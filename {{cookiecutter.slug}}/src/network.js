import axios from "axios";
import router from "@/router.js";

axios.interceptors.response.use(response => {
  return response
}, async error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    await router.push({name: 'login'});
  }

  return Promise.reject(error);
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})
