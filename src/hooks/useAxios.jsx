import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sportshub-nine.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
