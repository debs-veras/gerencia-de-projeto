import axios, { AxiosInstance } from "axios";
import { API_URL } from "./utils/api";

const getAxios = async (timeout: number = 600000) => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: timeout,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
};

export default getAxios;
