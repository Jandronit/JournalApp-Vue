import axios from 'axios';


const cloudinaryApi = axios.create({
    baseURL: process.env.VUE_APP_API_CLOUDINARY_URL,
});
export default cloudinaryApi;
