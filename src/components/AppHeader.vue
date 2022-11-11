<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Contact</h4>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white">Follow on Twitter</a></li>
              <li><a href="#" class="text-white">Like on Facebook</a></li>
              <li><a href="#" class="text-white">Email me</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand d-flex align-items-center">
          <strong>Popeye Gym</strong>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>

  <div class="logo-box">
      <img class="logo" src="@/assets/images/logo.png">
      <div class="name">Popeye Gym</div>
      <a href="javascript:;" v-if="isLogin" @click="logout">로그아웃</a>
  </div>

  
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
        // this.$store.commit('clearId')
        this.$store.commit('clearUser')
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
      isLogin() {
        return this.$store.getters.isLogin;
    },
  },
}

</script>

<style>
header {
    /* height: 130px; */
    /* display: flex; */
    align-items: center;
    background-color: cadetblue;
    color: crimson;
    /* letter-spacing: 3px; */
    font-size: 50px;
    /* font-weight: 900; */
    justify-content: center;
    font-family: 'Luckiest Guy', cursive;
}
.logo-box {
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

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
</style>