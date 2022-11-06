import store from '@/store/store.js';
import router from '@/router/index';
import { getRefreshToken } from '@/api/auth';



export function setInterceptors(instance) {

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${store.state.token}`; // 요청시 토큰 셋팅
      console.log(config)
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log('axios 인터셉터 에러 잡힘')
      
      const { config, response } = error;
      // console.log(error.response.data.code === 'TOKEN_EXPIRED')

      console.log(error)
      console.log(config)
      if (response.data.code === 'TOKEN_EXPIRED') {
        const accessToken = await getRefreshToken()
        console.log(typeof(accessToken));
        if (accessToken) {
          // config.headers.Authorization = `Bearer ${store.state.token}`
          // config.headers.Authorization = `Bearer ${accessToken}`
        }
        
        return instance.request({
          baseURL: "http://localhost:3000/",
          headers: {
            Authorization: `Bearer ${store.state.token}`
          },
          url: "/api/v1/pts/trainers"
        })
      }
      
      if (response.data.code === 'TOKEN_INVALID' || response.data.code === 'REFRESH_TOKEN_EXPIRED') {
        this.$store.commit('clearToken')
        this.$store.commit('clearId')
        router.replace('/')
      }

      return Promise.reject(error);
    },
  );
  return instance;
}