<template>
  <div class="main__container">
    <home-page />
    <slider-menu />
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'
import SliderMenu from "@/components/Slider/SliderMenu";

export default {
  name: 'Home',
  components: {
    HomePage,
    SliderMenu
  }
}
</script>

<style lang="scss">
.main__container {
  display: flex;
  margin: 0;
  justify-content: space-between;
}
</style>
