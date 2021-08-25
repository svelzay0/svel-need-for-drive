<template>
  <div class="home__menu">
    <div class="home__burger" />
    <div
      class="home__burger__button"
      :class="{ home__burger__button_active: isMenuActive }"
      @click="toggleBurgerMenu"
    >
      <span class="home__burger__lines" />
    </div>
    <div
      class="home__language-toggle"
      :class="{ 'home__language-toggle-mobile': isMenuActive }"
      @click="languageToggle"
    >
     {{ lang }}
    </div>
    <nav
      class="home__burger__nav"
      :class="{ home__burger__nav__active: isMenuActive }"
    >
      <p
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        class="home__burger__menu_item"
        @click="toHomePage"
      >
        {{ menuItem.name.toUpperCase() }}
      </p>
      <div class="home__social_icons">
        <span class="icon-telegram_white" />
        <span class="icon-facebook_white" />
        <span class="icon-instagram_white" />
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      lang: "Рус"
    };
  },
  computed: {
    ...mapGetters("home",
      [
        "menuItems",
        "isMenuActive"
      ])
    },
  methods: {
    ...mapActions("home",
      [
        "toggleBurgerMenu"
      ]),
    languageToggle() {
      if (this.lang === "Рус") {
        this.lang = "Eng";
      } else {
        this.lang = "Рус";
      }
    },
    toHomePage() {
      this.$router.push("/");
      this.toggleBurgerMenu();
    }
  }
};
</script>