import axios from "axios";

const API = axios.create({
  baseURL: "https://etaskbackend.vercel.app/api",
});

export default API;
