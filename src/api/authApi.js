import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.VUE_APP_API_AUTH_URL,
  params: {
    key: process.env.VUE_APP_API_AUTH_KEY,
  },
});
export default authApi;
