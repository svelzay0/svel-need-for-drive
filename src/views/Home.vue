<template>
  <div class="main__container">
    <home-page />
    <slider-menu />
  </div>
</template>

<script>
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
