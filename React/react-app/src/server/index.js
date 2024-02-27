import axios from "axios"
const service = axios.create();

service.interceptors.request.use(function (config) {
  // config.responseType = "blob"
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor

service.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response.data)
  return response;
}, function (error) {
  console.log(error)
  // Do something with response error
  return Promise.reject(error);
});

export default service