<template>
  <div class="order__total">
    <div
      v-if="getConfirmedOrder"
      class="total__container"
    >
      <div class="total__info">
        <p class="total__info_title">Ваш заказ подтвержден</p>
        <br>
        <p class="total__car_name">
          {{ getConfirmedOrder.carId.name }}
        </p>
        <p
          v-if="getOrder.carId.number"
          class="total__car_number"
        >
          <span class="total__option_text">{{ getConfirmedOrder.carId.number }}</span>
        </p>
        <p
          v-if="getConfirmedOrder.isFullTank"
          class="total__option"
        >
          <b>Топливо </b>
          <span class="total__option_text">100%</span>
        </p>
        <p class="total__option">
          <b>Доступна с </b>
          <span class="total__option_text">{{ new Date(getConfirmedOrder.dateFrom).toLocaleString(arr, dateSettings) }}</span>
        </p>
      </div>
      <img
        class="total__img"
        alt=""
        :src="imgPath(getConfirmedOrder)"
        @error="defaultImage"
      />
    </div>
    <div v-else class="total__container">
      <div class="total__info">
        <p class="total__car_name">{{ getOrder.carId.name }}</p>
        <p
          v-if="getOrder.carId.number"
          class="total__car_number"
        >
          {{ getOrder.carId.number }}
        </p>
        <p
          v-if="getOrder.isFullTank"
          class="total__option"
        >
          <b>Топливо </b>
          <span class="total__option_text">100%</span>
        </p>
        <p class="total__option">
          <b>Доступна с </b>
          <span class="total__option_text">{{ new Date(getOrder.dateFrom).toLocaleString(arr, dateSettings) }}</span>
        </p>
      </div>
      <img
        class="total__img"
        alt=""
        :src="imgPath(getOrder)"
        @error="defaultImage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Total",
  data () {
    return {
      arr: [],
      dateSettings: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  },
  computed: {
    ...mapGetters("total",
      [
        "getOrder",
        "getConfirmedOrder"
      ])
  },
  methods: {
    imgPath(order) {
      return `${process.env.VUE_APP_API_IMG}${order.carId.thumbnail.path}`;
    },
    defaultImage(e) {
      e.target.src = require('@/assets/default_car.jpg');
    }
  }
};
</script>
