import axiosClient from './axiosClient';

export const authApi = {
  login: (params) => {
    const url = '/api/auth/login'
    return axiosClient.post(url, params);
  },
  register: (params) => {
    const url = '/api/auth/register'
    return axiosClient.post(url, params);
  },
  changePassword: (params) => {
    const url = '/api/auth/change-password'
    return axiosClient.post(url, params);
  },
};