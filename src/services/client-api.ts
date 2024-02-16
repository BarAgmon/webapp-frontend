import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3000"
});

apiClient.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    // In case of not authorized error, and call havent retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            // Attempt to refresh token
            const res = await apiClient.get('/auth/refresh', {
                headers: { 'authorization': `Bearer ${refreshToken}` }
            });
            if (res.status === 200) {
                // Update local storage with new tokens
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                // Update the failed request with the new access token and retry
                originalRequest.headers['authorization'] = `Bearer ${res.data.accessToken}`;
                return apiClient(originalRequest);
            }
        } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            return Promise.reject(refreshError);
        }
    }
    // For other errors or if refresh token also fails, reject the promise
    return Promise.reject(error);
});

export default apiClient;
