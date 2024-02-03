import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    baseURL: import.meta.env.SERVER_URL
});

export default apiClient;