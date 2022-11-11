import { authRequest } from '@/api/index.js';
import store from '@/store/store.js';
import axios from 'axios';
import { getAuthFromCookie } from "@/utils/cookie";


// 로그아웃
function logout() {
  return authRequest.get('/api/v1/logout');
}

// refresh token 요청
function getRefreshToken() {
  return axios.post('/api/v1/auth/reissue', null, {
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
  .then(res => {
    const accessToken = res.data.token
    store.commit('setToken', accessToken);

    return accessToken
  })
}

// 로그인 여부 체크
function check() {
  const token = getAuthFromCookie()
  return axios.post('/api/v1/auth/check', null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// 유저 정보
function getUser(success) {
  return authRequest.get('/api/v1/users', success)
}

// // 학습 노트 데이터를 생성하는 API
// function createPost(postData) {
//   return posts.post('/', postData);
// }

// // 학습 노트 데이터를 삭제하는 API
// function deletePost(postId) {
//   return posts.delete(postId);
// }

export { logout, getRefreshToken, check, getUser };