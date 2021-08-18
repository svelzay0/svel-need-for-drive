<template>
  <div class="slides">
    <img :src="slide.image" class="slider__image" alt="" />
    <div class="slider__content">
      <span class="slider__title">
        {{ slide.title }}
      </span>
      <p class="slider__description">
        {{ slide.desc }}
      </p>
      <div class="slider__button" :style="slide.background">
        {{ slide.btnDesc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slide",
  props: {
    slide: Object
  }
};
</script>