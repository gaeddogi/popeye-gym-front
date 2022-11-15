<template>
  
  <!-- <AppHeader/> -->
  <RouterView/>    
  
</template>

<script>
// import AppHeader from "@/components/AppHeader.vue"
// import { getAuthFromCookie } from "@/utils/cookie";
// import { useRouter, useRoute } from 'vue-router'
// import { watch } from '@vue/runtime-core';

export default {
  name: 'App',
  // components: {
  //   AppHeader
  // },
  // created() {


  // },
  async created() {
    console.log('app 만들어짐')
    
    // const token = getAuthFromCookie()

    // if (token) {
    //   console.log('토큰을 가지고 있음')

    //   this.$store.commit('setToken', token)
    //   await this.$store.dispatch('fetchUser')
    //   console.log(this.$store.state.user)

    // }
    // else {
    //   // 토큰이 없으면 아무것도 할 필요 없음
    //   console.log('토큰 없음')

    // }

    // const route = useRoute()
    // console.log(route)

    // watch(route, () => {
    //   console.log('경로가 바뀌었다.')
      
    // })

  },

}
</script>

<style scoped>

</style>
