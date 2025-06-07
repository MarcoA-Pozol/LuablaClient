/*
    This code ensures that API requests automatically handle expired tokens by refreshing them and retrying failed requests, making authentication seamless for the user.
    Handle automatic token refresh for expired access tokens.
*/

import axios from 'axios';

const ApiTokenValidationAndRefreshMiddleware = axios.create({baseURL: 'http://localhost:8600'});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(ApiTokenValidationAndRefreshMiddleware(prom.config));
        }
    });

    failedQueue = [];
};

ApiTokenValidationAndRefreshMiddleware.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        const responseData = error.response?.data;

        const isTokenExpired = error.response?.status === 401 && responseData?.error === 'TOKEN_EXPIRED';

        if (isTokenExpired && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return ApiTokenValidationAndRefreshMiddleware.post('/auth/refresh', {}, { withCredentials: true })
                .then(() => {
                    isRefreshing = false;
                    processQueue(null);
                    return ApiTokenValidationAndRefreshMiddleware(originalRequest);
                })
                .catch(err => {
                    isRefreshing = false;
                    processQueue(err);
                    return Promise.reject(err);
                });
        }

        return Promise.reject(error);
    }
);


export default ApiTokenValidationAndRefreshMiddleware;