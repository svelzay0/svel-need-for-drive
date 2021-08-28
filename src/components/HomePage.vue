<template>
  <div class="home__container">
    <div class="home__content">
      <header-menu />
      <main class="home__main">
        <h1 class="home__text_bold-black">
          Каршеринг
        </h1>
        <h2 class="home__text_bold-green">
          Need for drive
        </h2>
        <p class="home__text_gray">
          Поминутная аренда авто твоего города
        </p>
        <router-link class="home__button" :to="{ name: 'Order' }">
          {{ title }}
        </router-link>
      </main>
      <footer class="home__footer">
        <p class="home__text_footer">
          © 2016-2019 «Need for drive»
        </p>
        <p class="home__text_phone">
          8 (495) 234-22-44
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    HeaderMenu
  },
  computed: {
    ...mapGetters('total', ['getConfirmedOrder']),
    title () {
      return this.getConfirmedOrder ? 'Посмотреть заказ' : 'Забронировать'
    }
  }
}
</script>