<template>
  
</template>

<script>
export default {
  created () {
    const token = this.$route.query.token;
    const id = this.$route.query.id;
    console.log('token', token)
    console.log('id', id);

    if (token && id) {


      this.$store.commit('setId', id);
      this.$store.commit('setToken', token); // 토큰 셋팅

      this.$router.replace('/main')
    }
    else {
      alert('로그인 실패')
    }
  },
}
</script>

<style>

</style>