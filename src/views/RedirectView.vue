<template>
  
</template>

<script>
export default {
  async created () {
    const token = this.$route.query.token;
    // const id = this.$route.query.id;
    // console.log('token', token)
    // // console.log('id', id);

    // if (token && id) {
    if (token) {

      // this.$store.commit('setId', id);
      this.$store.commit('setToken', token); // 토큰 셋팅
      await this.$store.dispatch('fetchUser')

      // console.log(this.$store.state.user)

      // this.$router.replace('/main')
      // console.log(this.$route.query)
      this.$router.replace(this.$route.query.redirect || '/')
    }
    else {
      alert('로그인 실패')
      this.$router.replace('/')
    }
  },
}
</script>

<style>

</style>