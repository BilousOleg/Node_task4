import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createPhone = data => axiosInstance.post('/phones', data);

export const getPhones = () => axiosInstance.get('/phones');

export const getPhoneById = id => axiosInstance.get(`/phones/${id}`);

export const updatePhone = (id, data) =>
  axiosInstance.patch(`/phones/${id}`, data);

export const deletePhone = id => axiosInstance.delete(`/phones/${id}`);
