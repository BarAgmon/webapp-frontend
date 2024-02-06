import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    // baseURL: import.meta.env.SERVER_URL
    baseURL: "http://localhost:3000"
});

export default apiClient;