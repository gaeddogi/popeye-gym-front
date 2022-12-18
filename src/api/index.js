import axios from 'axios';
import { setInterceptors } from '@/api/common/interceptors';

export function createInstance() { // 기본 axios 인스턴스
  return axios.create({
    baseURL: `${process.env.VITE_IP}:${process.env.VITE_PORT}`,
  });
}

export function createInstanceWithAuth(url) { // add access token to header axios 인스턴스
  const instance = axios.create({
    baseURL: `${process.env.VITE_IP}:${process.env.VITE_PORT}/${url}`,
  });
  return setInterceptors(instance);
}

export const request = createInstance();
export const authRequest = createInstanceWithAuth('');
