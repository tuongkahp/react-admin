// api/axiosClient.js
import { message } from 'antd';
import axios from 'axios';
import queryString from 'query-string';
import { getRecoil, setRecoil } from "recoil-nexus";
import { authState } from 'recoils/authState';
import { i18nState } from 'recoils/i18nState';
import { loadingState } from 'recoils/loadingState';
import { createBrowserHistory } from 'history';
import { authApi } from './authApi';

const history = createBrowserHistory();
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (request) => {
  // Handle token here ...
  // console.log('request: ' + request?.url, request.data)
  request.headers['Accept-Language'] = getRecoil(i18nState)
  const auth = getRecoil(authState)

  if (auth?.token && !request?.headers?.Authorization)
    request.headers.Authorization = `Bearer ${auth.token}`

  const loading = getRecoil(loadingState)
  setRecoil(loadingState, loading + 1)
  return request
})

axiosClient.interceptors.response.use((response) => {
  const loading = getRecoil(loadingState)
  setRecoil(loadingState, loading - 1)

  console.log('response: ' + response?.config?.url, response.data)

  if (response && response.data)
    return response.data

  return response
}, async (error) => {
  // Handle errors
  const loading = getRecoil(loadingState)
  setRecoil(loadingState, loading - 1)
  message.error(error?.response?.status ?? 'err')
  console.log(error)
  const originalConfig = error.config

  if (error.response.status === 401) {
    if (originalConfig._retry) {
      // authenticationStore.logout()
      //   .finally(() => {
      //     history.push({
      //       pathname: PAGES.LOGIN.PATH,
      //       state: { from: window.location.pathname },
      //     })
      //   })
      // notification.error({
      //   message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
      //   description: 'Phiên đăng nhập hết hạn',
      // })

      return Promise.reject(error);
    }

    try {
      if (isRefreshing) {
        originalConfig._retry = true
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalConfig.headers['Authorization'] = 'Bearer ' + token
          return axios(originalConfig)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalConfig._retry = true
      isRefreshing = true

      console.log('Refresh token then retry')

      let refreshTokenResult = await authApi.refreshToken(getRecoil(authState).refreshToken)
      if (!refreshTokenResult?.status)
        return Promise.reject(error)


      // authenticationStore.handleRefreshToken({ RefreshToken: localStorage.getItem('refreshToken') })
      //   .then((res) => {
      //     if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
      //       originalConfig.headers.Authorization = `Bearer ${res?.param}`
      //       processQueue(null, res?.param)
      //       return axios(originalConfig)
      //     } else {
      //       authenticationStore.logout()
      //         .finally(() => {
      //           history.push({
      //             pathname: PAGES.LOGIN.PATH,
      //             state: { from: window.location.pathname },
      //           })
      //         })
      //       notification.error({
      //         message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
      //         description: 'Phiên đăng nhập hết hạn',
      //       })
      //     }
      //   })
      //   .finally(() => {
      //     isRefreshing = false
      //   })
    } catch (err) {
      // notification.error({
      //   message: <ColorText fontSize={'20px'} color={ERROR_COLOR}>{ERROR_TITLE}</ColorText>,
      //   description: error?.message,
      // })
      return Promise.reject(err)
    }
  }

  return Promise.reject(error);
})

const refreshAccessToken = () => {
  return axiosClient.post()
}

export default axiosClient