import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});
export default api;
