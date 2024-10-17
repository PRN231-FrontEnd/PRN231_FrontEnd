import { useEffect } from "react";
import axios from "axios";

const useAxiosInterceptor = () => {
    const axiosClient = axios.create({
        baseURL: "https://flowerexchange.azurewebsites.net",
    });

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosClient.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosClient.interceptors.request.eject(requestInterceptor);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return axiosClient;
};

export default useAxiosInterceptor;
