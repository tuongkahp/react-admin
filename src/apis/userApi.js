import axios from 'axios'
import axiosClient from './axiosClient';

const source = axios.CancelToken.source()

export const userApi = {
  getAll: (params) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  }
};