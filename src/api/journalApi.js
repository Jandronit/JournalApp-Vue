import axios from "axios";

const journalApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
journalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");
  if (token) {
    config.params = { auth: token };
  }
  return config;
});
export default journalApi;
