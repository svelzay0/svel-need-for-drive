<template>
  <div id="app">
    <home-menu />
    <router-view />
  </div>
</template>

<script>
import HomeMenu from './components/HomeMenu';
import { mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    HomeMenu
  },
  data() {
    return {
      layout: this.$route.meta.layout,
      windowWidth: window.innerWidth
    };
  },
  mounted() {
    this.fetchCity();
    this.fetchPoints();
    this.setWindowWidth(this.windowWidth);
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.setWindowWidth(this.windowWidth);
    }
  },
  methods: {
    ...mapActions("order",
      [
        "fetchCity",
        "fetchPoints"
      ]),
    ...mapMutations('home', ['setWindowWidth'])
  }
};
</script>