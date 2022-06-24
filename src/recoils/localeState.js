import { atom } from "recoil"
import { I18N_LANGUAGE } from 'utils/constant'
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';

const localStorageEffect = key => ({ setSelf, onSet }) => {
  // const savedValue = localStorage.getItem('i18nextLng')
  // if (savedValue != null) {
  //   setSelf(savedValue === I18N_LANGUAGE.EN ? enUS : viVN)
  // }

  onSet((newValue, _, isReset) => {
    console.log('localeState', newValue)
    // if (isReset || !newValue) {
    //   localStorage.removeItem(key)
    // } else
    //   localStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const localeState = atom({
  key: 'locale',
  default: localStorage.getItem('i18nextLng') === I18N_LANGUAGE.EN.key ? enUS : viVN,
  // default: viVN,
  // effects: localStorageEffect
})