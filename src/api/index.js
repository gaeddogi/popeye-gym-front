import axios from 'axios';
import { setInterceptors } from '@/api/common/interceptors';

export function createInstance() { // 기본 axios 인스턴스
  return axios.create({
    baseURL: process.env.VUE_APP_API_URI,
  });
}

export function createInstanceWithAuth(url) { // add access token to header axios 인스턴스
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URI}${url}`,
  });
  return setInterceptors(instance);
}

export const request = createInstance();
export const authRequest = createInstanceWithAuth('');
