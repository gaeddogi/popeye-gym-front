<template>
  
  <AppHeader/>
  <RouterView/>    
  
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import { getUser } from "@/api/auth"
import { getAuthFromCookie } from "@/utils/cookie";
import router from '@/router/index.js'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  created() {
    console.log('app 만들어짐')

    if (getAuthFromCookie()) {
      console.log('토큰을 가지고 있음')

      this.$store.dispatch('fetchUser')
      console.log(this.$store.state.user)

      // getUser()
      // .then(res => {
      //   console.log(res)
      //   // 여기서 store에 저장
      // })
      // .catch(err => {
      //   // this.$store.commit('clearToken')
      //   // this.$store.commit('clearId')
      //   // router.replace('/')
      // })
    }
    else {
      // 토큰이 없으면 아무것도 할 필요 없음
      console.log('토큰 없음')

    }

  }
}
</script>

<style scoped>

</style>
