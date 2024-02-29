import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set your base URL here
  headers: {
    'Content-Type': 'application/json', // Example of a common header
  },
});

export default axiosInstance;
