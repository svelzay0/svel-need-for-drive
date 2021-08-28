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
          <span class="total__option_text">
            {{ getDate(getConfirmedOrder.dateFrom.length > 4 ? getConfirmedOrder.dateFrom : getOrder.dateFrom, arr, dateSettings) }}
          </span>
        </p>
      </div>
      <img
        class="total__img"
        alt=""
        :src="getImgPath(getConfirmedOrder)"
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
          <span class="total__option_text">
            {{ getDate(getOrder.dateFrom, arr, dateSettings) }}
          </span>
        </p>
      </div>
      <img
        class="total__img"
        alt=""
        :src="getImgPath(getOrder)"
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
    ...mapGetters("home", ["currentStep"]),
    ...mapGetters("total",
      [
        "getOrder",
        "getConfirmedOrder"
      ])
  },
  mounted () {
    this.$router.push({ name: 'Order', params: { stepName: this.currentStep.url } });
  },
  methods: {
    getImgPath(order) {
      return `${process.env.VUE_APP_API_IMG}${order.carId.thumbnail.path}`;
    },
    defaultImage(e) {
      e.target.src = require('@/assets/default_car.jpg');
    },
    getDate(date, arr, settings) {
      return new Date(date).toLocaleString(arr, settings)
    }
  }
};
</script>
