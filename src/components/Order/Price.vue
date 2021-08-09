<template>
  <div class="order__price">
    <h3
      v-if="vision"
      class="close__btn"
      @click="$emit('close')" 
      v-html="closeBtn"
    >
    </h3>
    <div class="price__container">
      <p class="price__title">
        Ваш заказ:
      </p>
      <div v-if="getPoint" class="price__menu_step">
        <p class="price__menu_step__name">
          Пункт выдачи
        </p>
        <div class="price__dots" />
        <div class="price__menu_step__value">
          {{ getPoint.cityId.name }},
          <br />
          {{ getPoint.address }}
        </div>
      </div>
      <button-next :button-view="'withText'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonNext from "@/components/Order/ButtonNext";

export default {
  name: 'Price',
  components: { ButtonNext },
  props: {
    vision: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closeBtn: '&#10006;'
    }
  },
  computed: {
    ...mapGetters('order', 
      [
        'getCity', 
        'getPoint', 
        'getPoints'
      ])
  },
}
</script>
