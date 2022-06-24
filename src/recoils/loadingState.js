import { atom } from "recoil"

export const loadingState = atom({
  key: 'loading',
  default: 0,
})

export const globalLoadingState = atom({
  key: 'globalLoading',
  default: 0,
})