// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { getRecoil, setRecoil } from "recoil-nexus";
import { loadingState } from 'recoils/loadingState';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (request) => {
  // Handle token here ...
  console.log('request: ' + request?.url, request.data)

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
}, (error) => {
  // Handle errors
  const loading = getRecoil(loadingState)
  setRecoil(loadingState, loading - 1)
  throw error
})

export default axiosClient