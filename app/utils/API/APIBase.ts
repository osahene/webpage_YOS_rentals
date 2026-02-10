import axios from "axios";

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://127.0.0.1:8000",
});

export default $axios;
