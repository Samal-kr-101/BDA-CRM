import axios from "axios";

const API = axios.create({
  baseURL: "https://bda-crm.onrender.com/api",
});

export default API;