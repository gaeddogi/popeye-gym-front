<template>
    <main class="main-container">
        <nav class="menu-container">
            
            <button class="menu-button">
                <RouterLink to="/reservation">예약하기</RouterLink>
            </button>
            <button class="menu-button">
                <RouterLink to="/reservation/list">예약내역</RouterLink>
            </button>
        </nav>
    </main>
</template>

<script>

import { RouterLink, RouterView } from "vue-router";

export default {

}
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    /* background-color: antiquewhite; */
}
.menu-container {
    display: grid;
    height: 200px;
}
.menu-button {
    width: 300px;
    height: 80px;
    background: white;
    border-radius: 11px;
}
.menu-button > a {
    font-size: 30px;
    text-decoration: none;
    color: black;
    font-family: 'Black Han Sans', sans-serif;
}
.menu-button:hover {
  background: orange;
}

</style>