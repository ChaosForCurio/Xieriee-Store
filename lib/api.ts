import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiError {
    message: string;
    status?: number;
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Standardize error format
        const customError: ApiError = {
            message: error.response?.data?.error || error.message || 'Something went wrong',
            status: error.response?.status,
        };

        // Log critical errors (optional: send to logging service)
        if (customError.status && customError.status >= 500) {
            console.error('Server Error:', customError);
        }

        return Promise.reject(customError);
    }
);

export default api;
