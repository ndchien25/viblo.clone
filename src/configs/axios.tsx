import axios from "axios"

const apiClient = axios.create({
    baseURL: 'https://api.viblo.clone/api',
    withCredentials: true,
    withXSRFToken: true,
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

const hasCsrfCookie = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('XSRF-TOKEN='));
};
apiClient.interceptors.request.use(async (config) => {
    if (!hasCsrfCookie()) {
        await axios.get('https://api.viblo.clone/sanctum/csrf-cookie', { withCredentials: true });
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
export { apiClient }