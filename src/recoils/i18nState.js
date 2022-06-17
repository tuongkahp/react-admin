import { atom } from "recoil";
import { I18N_LANGUAGE } from 'utils/constant'

export const i18nState = atom({
  key: 'i18n',
  default: localStorage.getItem('language') || I18N_LANGUAGE.EN,
});