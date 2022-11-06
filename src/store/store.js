import { createStore } from "vuex";
import { getUserFromCookie, getAuthFromCookie, saveAuthToCookie, saveUserToCookie, deleteCookie } from "@/utils/cookie";


// const storage = {
//   fetch() {
//     let obj = {}
//     if (localStorage.account != null) {
//       let stringObj = localStorage.getItem('account')
//       obj = JSON.parse(stringObj)
//     }
//     return obj;
//   }

// }


export default createStore({
  state: {
    id: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  getters: {
      isLogin(state) {
          return state.token !== '';
      }
  },
  actions: { // dispatch 로 부를 수 있다.
      // fetchUser ({state, commit}, callback) {
      //     state.user
      //       ? callback && callback()
      //       : accountApi.getUser(
      //         res => {
      //           commit('setUser', res.user)
      //           callback && callback()
      //         }
      //       )
      //   }
  },
  mutations: {  // commit 으로 부를 수 있다.
    setId(state, id){
      state.id = id;
      saveUserToCookie(id)

      // localStorage.setItem('id', id) // 로컬스토리지에 저장하는게 이시점 맞나?
    },
    setToken(state, token){
      state.token = token;
      saveAuthToCookie(token)

      // localStorage.setItem('token', token) // 로컬스토리지에 저장하는게 이시점 맞나?
    },
    clearToken(state) {
      state.token = '';
      deleteCookie('auth');
    },
    clearId(state) {
      state.id = '';
      deleteCookie('user');
    },
  },
})