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
