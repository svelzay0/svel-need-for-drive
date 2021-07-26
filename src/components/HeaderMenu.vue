<template>
  <div class="home__header">
    <p class="home__text_slim-green">
      Need for drive
    </p>
    <div class="home__header__city">
        <img class="home__pic_city" :src="require('@/assets/main_map.svg')" alt="" />
        <p class="home__text_city">
          Саранск
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu'
}
</script>