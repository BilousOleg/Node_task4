import axios from 'axios';

const axiosInstanse = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getPhones = () => axiosInstanse.get('/phones');

export const deletePhone = id => axiosInstanse.delete(`/phones/${id}`);
