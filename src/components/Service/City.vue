<template>
  <div 
    v-if="getCity"
    class="home__header__city"
  >
    <img 
      class="home__pic_city" 
      :src="require('@/assets/main_map.svg')" 
      alt="Location" 
    />
    <p class="home__text_city">
      {{ getCity.name }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "City",
  computed: {
    ...mapGetters("order", 
      [
        "getCity"
      ])
  }
};
</script>