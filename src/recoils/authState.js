import { atom } from "recoil"

const localStorageEffect = key => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key) || sessionStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue, _, isReset) => {
    if (isReset || !newValue) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    } else
      newValue.remember
        ? localStorage.setItem(key, JSON.stringify(newValue))
        : sessionStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const authState = atom({
  key: 'auth',
  default: null,
  effects: [
    localStorageEffect('auth')
  ]
})