import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials:true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    //console.log("solicitud enviada: ", config);
    return config;
  },
  (error) => {
    console.log("error en la solicitud: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    //console.log("respuesta recivida: ", response);
    return response;
  },
  (error) => {
    console.log(
      "error en la respuesta: ",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
