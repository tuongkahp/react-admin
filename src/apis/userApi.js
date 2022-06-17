import axios from 'axios'
import axiosClient from './axiosClient';

const source = axios.CancelToken.source()

export const userApi = {
  getAll: (params) => {
    const url = '/api/users';
    return axiosClient.get(url, { params });
  },
  getDetail: (userId) => {
    const url = `/api/users/${userId}`;
    return axiosClient.get(url);
  }
};