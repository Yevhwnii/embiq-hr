import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
  },
});

export default axiosInstance;
