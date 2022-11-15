<template>
    <main class="main-container">
      <div class="login-form">
        <div style="text-align:center">Popeye Gym</div>
        <div>
            <a class="button button--social-login button--google" :href="'http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect'"><i class="icon fa fa-google"></i>구글로 시작하기</a>
            <a class="button button--social-login button--naver" :href="'http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth2/redirect'"><img class="icon naver-icon" src="/src/assets/images/naver-icon.png"/>네이버로 시작하기</a>
            <a class="button button--social-login button--kakao" :href="'http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect'"><img class="icon kakao-icon" src="/src/assets/images/kakao-icon.png"/>카카오로 시작하기</a>
        </div>
      </div>
        <!-- <div class="background-image"></div> -->
    </main>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const state = ref({
      form: {
        email: "",
        password: ""
      }
    })
    return {state}
  }
}
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    background-color: cadetblue;
    flex-direction: column;

}
.login-form {
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 400px;
    justify-content: center;
    background-color: #f6f2f2;
    border: 1px solid;
    
}
.background-image {
    background-image:url('@/assets/images/popeye.png');
    background-repeat: no-repeat;
}


/* 로그인 버튼 통합 */
.button {
  width: auto;
  display: inline-block;
  padding: 0 18px 0 6px;
  border: 0 none;
  border-radius: 5px;
  text-decoration: none;
  transition: all 250ms linear;
  margin: 5px 40px;
}
.button:hover {
  text-decoration: none;
}

.button--social-login {
  /* margin-bottom: 12px; */
  /* margin-right: 12px; */
  color: white;
  height: 50px;
  line-height: 46px;
  position: relative;
  text-align: left;
}
.button--social-login .icon {
  margin-right: 12px;
  font-size: 24px;
  line-height: 24px;
  width: 42px;
  height: 24px;
  text-align: center;
  display: inline-block;
  position: relative;
  top: 4px;
}
.button--social-login .icon:before {
  display: inline-block;
  width: 40px;
}
.button--social-login .icon:after {
  content: "";
}

.button--bitbucket {
  background-color: #205081;
  border: 1px solid #163758;
}
.button--bitbucket .icon {
  border-right: 1px solid #163758;
}
.button--bitbucket .icon:after {
  border-right: 1px solid #2a69aa;
}
.button--bitbucket:hover {
  background-color: #1b436d;
}

.button--dropbox {
  background-color: #007DE1;
  border: 1px solid #0061ae;
}
.button--dropbox .icon {
  border-right: 1px solid #0061ae;
}
.button--dropbox .icon:after {
  border-right: 1px solid #1597ff;
}
.button--dropbox:hover {
  background-color: #006fc8;
}

/* 구글로그인 버튼 */
.button--google {
  background-color: #3F85F4;
  border: 1px solid #3F85F4;
  display: flex;
  align-content: center;
}
/* .button--google .icon {
  border-right: 1px solid #0f66f1;
}
.button--google .icon:after {
  border-right: 1px solid #6fa4f7;
} */
.button--google:hover {
  background-color: #2776f3;
}

/* 네이버로그인 버튼 */
.button--naver {
    background-color: #03c75b;
    border: #03c75b;
  display: flex;
  align-content: center;
}
/* .button--naver .icon {
  border-right: 1px solid #03a74d;
}
.button--naver .icon:after {
  border-right: 1px solid #5dae81;
} */
.button--naver:hover {
  background-color: #00c157;
}
.naver-icon {
    width: 40px !important;
    height: 40px !important;
}

/* 카카오로그인 버튼 */
.button--kakao {
    background-color: #fee502;
    border: #fee502;
  display: flex;
  align-content: center;
  color: #191919 !important;
}
/* .button--kakao .icon {
  border-right: 1px solid #03c75b;
} */
/* .button--kakao .icon:after {
  border-right: 1px solid #5dae81;
} */
.button--kakao:hover {
  background-color: #f5dd02;
}
.kakao-icon {
    width: 40px !important;
    height: 40px !important;
}
</style>