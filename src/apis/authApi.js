import axiosClient from './axiosClient';

export const authApi = {
  login: (params) => {
    const url = '/api/auth/login'
    return axiosClient.post(url, params);
  },
  logout: () => {
    const url = '/api/auth/logout'
    return axiosClient.post(url);
  },
  register: (params) => {
    const url = '/api/auth/register'
    return axiosClient.post(url, params);
  },
  changePassword: (params) => {
    const url = '/api/auth/change-password'
    return axiosClient.post(url, params);
  },
  refreshToken: (refreshToken) => {
    const url = '/api/auth/refresh-token'
    return axiosClient.post(url, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  }
};