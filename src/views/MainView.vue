<template>

  <div class="logo-box">
    <img class="logo" src="@/assets/images/logo.png">
    <div class="name">Popeye Gym</div>
  </div>


  <Carousel>
    <Slide v-for="slide in 6" :key="slide">
      <!-- <img class="carousel__item" v-if="slide === 1" src="/src/assets/images/main_1.jpg"> -->
      <!-- <img class="carousel__item" v-if="slide === 2" src="/src/assets/images/main_2.jpg"> -->
      <!-- <img class="carousel__item" v-if="slide === 3" src="/src/assets/images/main_3.jpg"> -->
      <!-- <img class="carousel__item" v-if="slide === 4" src="/src/assets/images/main_4.jpg"> -->
      <!-- <img class="carousel__item" v-if="slide === 5" src="/src/assets/images/main_5.jpg"> -->
      <!-- <img class="carousel__item" v-if="slide === 6" src="/src/assets/images/main_6.jpg"> -->
      <div v-if="slide === 1" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_1.jpg)"></div>
      <div v-if="slide === 2" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_2.jpg)"></div>
      <div v-if="slide === 3" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_3.jpg)"></div>
      <div v-if="slide === 4" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_4.jpg)"></div>
      <div v-if="slide === 5" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_5.jpg)"></div>
      <div v-if="slide === 6" class="carousel__item background-custom" style="background-image:url(/src/assets/images/main_1.jpg)"></div>
    </Slide>




    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>

</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  // name: 'main',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
}
</script>


<style scoped>
.carousel__item {
  min-height: 500px;
  width: 80%;
  background-color:  rgb(0 0 0 / 13%);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.background-custom {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


.logo-box {
    height: 170px;
    display: flex;
    align-items: center;
    /* background-color: cadetblue; */
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