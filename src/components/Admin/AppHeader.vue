<template>
  
    <header>
      <div class="collapse bg-info" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-4 offset-md-1 py-4">
              <ul class="list-unstyled">
                <li><RouterLink to="/admin" @click="closeCollapse">회원 관리</RouterLink></li>
                <li><RouterLink to="/admin/trainer" @click="closeCollapse">트레이너 관리</RouterLink></li>
                <li><a href="javascript:;" @click="logout" v-if="isLogin">로그아웃</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-info shadow-sm">
        <div class="container">
          <RouterLink to="/" class="navbar-brand d-flex align-items-center">
            <strong style="padding-top: 5px;">Popeye Gym_admin</strong>
          </RouterLink>
          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarHeader" 
            aria-controls="navbarHeader" 
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  
  </template>
  
  <script>
  import router from '@/router/index.js'
  import { logout } from '@/api/auth.js'
  // import { useRoute } from 'vue-router'
  // import { watch } from '@vue/runtime-core';
  // require('../src/js/drag-and-drop.js')
  
  
  
  export default {
    methods: {
      logout() {
        document.getElementsByClassName('navbar-toggler')[0].click()
  
        logout()
        .then(res => {
          // console.log(router)
          // console.log('ddd')
          this.$store.commit('clearToken')
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
      },
      closeCollapse() {
        // this.$forceUpdate()
        document.getElementsByClassName('navbar-toggler')[0].click()
      },
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      },
      getRole() {
        return this.$store.getters.getRole
      },
    },
  }
  
  </script>
  
  <style scoped>
  header {
      /* height: 130px; */
      /* display: flex; */
      align-items: center;
      /* background-color: #eee; */
      /* background-color: cadetblue; */
      color: crimson;
      /* letter-spacing: 3px; */
      font-size: 20px;
      /* font-weight: 900; */
      justify-content: center;
      /* font-family: 'Black Han Sans', sans-serif; */
      font-family: 'Luckiest Guy', cursive;
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
  
  li > a {
    color: #fff;
    text-decoration: none;
  }
  .small-text {
    font-size: 15px;
  }
  </style>