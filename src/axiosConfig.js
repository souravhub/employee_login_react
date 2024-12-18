// src/axiosConfig.js
import axios from 'axios';
import conf from './conf/conf.js';

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: conf.apiBaseUrl, // Replace with your API's base URL
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
	(config) => {
		// Retrieve the token from localStorage (or any other storage mechanism)
		const token = localStorage.getItem('empLogin:token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		// Handle request error
		return Promise.reject(error);
	}
);

export default axiosInstance;
