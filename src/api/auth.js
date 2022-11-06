import { authRequest } from '@/api/index.js';
import store from '@/store/store.js';
import axios from 'axios';

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

// // 학습 노트 데이터를 생성하는 API
// function createPost(postData) {
//   return posts.post('/', postData);
// }

// // 학습 노트 데이터를 삭제하는 API
// function deletePost(postId) {
//   return posts.delete(postId);
// }

export { logout, getRefreshToken };