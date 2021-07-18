<template>
  <div id="app">
    <home-menu />
    <router-view />
  </div>
</template>

<script>
import HomeMenu from './components/HomeMenu';

export default {
  name: "App",
  components: {
    HomeMenu
  },
};  
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  overflow: hidden;
  height: 100vh;
}
</style>
