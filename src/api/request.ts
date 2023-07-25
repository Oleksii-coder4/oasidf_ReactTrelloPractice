import axios from 'axios';
import { api } from '../common/constants';
import { useState } from 'react';
console.log(api);
console.log(' current ' + api.baseURL);
const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123', // до цього ми ще повернемося якось потім
  },
});

instance.interceptors.response.use((res) => res.data);

// const useLoadingState = () => {
//   const [loading, setLoading] = useState(false);
//   const showLoader = () => setLoading(true);
//   const hideLoader = () => setLoading(false);

//   return { loading, showLoader, hideLoader };
// };

// Request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     const { showLoader } = useLoadingState();
//     showLoader();
//     return config;
//   },
//   (error) => {
//     const { hideLoader } = useLoadingState();
//     hideLoader();
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     const { hideLoader } = useLoadingState();
//     hideLoader();
//     return response;
//   },
//   (error) => {
//     const { hideLoader } = useLoadingState();
//     hideLoader();
//     return Promise.reject(error);
//   }
// );

export default instance;
