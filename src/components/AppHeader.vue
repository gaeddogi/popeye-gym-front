<template>
    <header>
        <img class="logo" src="@/assets/images/logo.png">
        <div class="name">Popeye Gym</div>
        <a href="javascript:;" v-if="isUserLogin" @click="logout">로그아웃</a>
    </header>
</template>

<script>
import axios from 'axios';
import store from '@/store/store.js';
import router from '@/router/index.js';
import { logout } from '@/api/auth.js';


export default {
  methods: {
    logout() {
      logout()
      .then(res => {
        this.$store.commit('clearToken')
        this.$store.commit('clearId')
        router.replace('/')
      })
      .catch(err => {
        // if (err.response.data.code === 'TOKEN_EXPIRED') {
        //   this.$store.commit('clearToken')
        //   this.$store.commit('clearId')
        //   router.replace('/')
        // }
      })
    }
  },
  // setup() {
  //   // const instance = axios.create({
  //   //   headers: {
  //   //       Authorization: `Bearer ${store.state.token}`, 
  //   //   },
  //   // });
  //   const logout = logout;
  //   //() => {

      

  //     // instance.get('/api/v1/logout', )
  //     // .then(res => {

  //     // })
  //     // .catch(err => {
  //     //     if (err.response.data.code === 'TOKEN_EXPIRED') {
  //     //         router.replace('/')
  //     //     }
  //     // })
  //   //}
  //     return { logout }
  //   },
    computed: {
      isUserLogin() {
        return this.$store.getters.isLogin;
    },
  },
}
</script>

<style>
header {
    height: 130px;
    display: flex;
    align-items: center;
    background-color: cadetblue;
    color: crimson;
    /* letter-spacing: 3px; */
    font-size: 50px;
    /* font-weight: 900; */
    justify-content: center;
    font-family: 'Luckiest Guy', cursive;
}
.logo {
    height: 100px;
    margin: 10px;
}
.name {
    margin-top: 13px;
}
</style>