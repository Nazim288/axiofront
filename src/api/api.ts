import axios from "axios";

const api = axios.create({
  baseURL: "https://open-me.onrender.com/",
});
export default api;
