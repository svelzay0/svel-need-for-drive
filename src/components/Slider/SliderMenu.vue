<template>
  <slider
    animation="fade"
    :autoplay="true"
    :v-model="slidesLength"
    class="slider"
  >
    <slider-item v-for="slide in slides" :key="slide.id">
      <slide :slide="slide" />
    </slider-item>
    <div :class="{ slider__overlay: isMenuActive }" />
  </slider>
</template>

<script>
import { mapGetters } from "vuex";
import Slide from "@/components/Slider/Slide";

export default {
  name: "SliderMenu",
  computed: {
    ...mapGetters("home", 
      [
        "slides", 
        "slidesLength",
        "isMenuActive"
      ]),
  },
  components: {
    Slide
  }
};
</script>
