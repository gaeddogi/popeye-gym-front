import { createStore } from "vuex";
import { getUserFromCookie, getAuthFromCookie, saveAuthToCookie, saveUserToCookie, deleteCookie } from "@/utils/cookie";
import { getUser } from "@/api/auth"
import router from '@/router/index.js';


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
    // id: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    // token: '',
    user: '',
  },
  getters: {
      isLogin(state) {
          return state.user !== '';
          // return state.token !== '';

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
      //   },
      fetchUser({commit}) {
        getUser()
        .then(res => {
          console.log(res)
          commit('setUser', res.data)
        })
        .catch(err => {
          console.log(err)

          commit('clearToken')
          commit('clearUser')
          router.replace('/')

        })
      }

  },
  mutations: {  // commit 으로 부를 수 있다.
    // setId(state, id){
    //   state.id = id;
    //   saveUserToCookie(id)
    // },
    setToken(state, token){
      state.token = token;
      saveAuthToCookie(token)
    },
    setUser(state, user){
      state.user = user;
    },
    clearToken(state) {
      state.token = '';
      deleteCookie('auth');
    },
    clearUser(state) {
      state.user = '';
    },
    // clearId(state) {
    //   state.id = '';
    //   deleteCookie('user');
    // },
  },
})