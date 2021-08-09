<template>
  <div class="home__header">
    <p class="home__text_slim-green">
      Need for drive
    </p>
    <city />
  </div>
</template>

<script>
import City from '@/components/Service/City.vue'

export default {
  name: 'HeaderMenu',
  components: {
    City
  }
}
</script>