import { atom } from "recoil";

export const themeState = atom({
  key: 'theme',
  default: localStorage.getItem('theme'),
});