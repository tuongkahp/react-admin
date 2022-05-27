import { atom, selector } from "recoil";

export const authState = atom({
  key: 'auth',
  default: {
    token: localStorage.getItem('token') || sessionStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
  },
});