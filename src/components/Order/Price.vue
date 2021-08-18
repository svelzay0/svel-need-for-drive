<template>
  <div class="order__price">
    <h3
      v-if="vision"
      v-html="closeBtn"
      class="close__btn"
      @click="$emit('close')"
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
      <div v-if="getCar" class="price__menu_step">
        <p class="price__menu_step__name">Модель</p>
        <div class="price__dots" />
        <div class="price__menu_step__value">
          {{ getCar.name }}
        </div>
      </div>
      <div v-if="getColor" class="price__menu_step">
        <p class="price__menu_step__name">Цвет</p>
        <div class="price__dots" />
        <div class="price__menu_step__value">
          {{ getColor }}
        </div>
      </div>
      <div v-if="getRentDuration" class="price__menu_step">
        <p class="price__menu_step__name">Длительность аренды</p>
        <div class="price__dots" />
        <div class="price__menu_step__value">
          {{ getRentDuration.units }}{{ getRentDuration.name }}
        </div>
      </div>
      <div v-if="getRate" class="price__menu_step">
        <p class="price__menu_step__name">Тариф</p>
        <div class="price__dots" />
        <div class="price__menu_step__value">{{ getRate.rateTypeId.name }}</div>
      </div>
      <div v-for="opt in getOptions" :key="opt.name">
        <div v-if="opt.optValue" class="price__menu_step">
          <p class="price__menu_step__name">{{ opt.name }}</p>
          <div class="price__dots" />
          <div class="price__menu_step__value">Да</div>
        </div>
      </div>
      <div v-if="getCar" class="price__total">
        <div v-if="getPrice && !isPriceValid" class="price__total_error">
          <b>Цена: </b>для Вашей машины должна быть в диапазоне от
          {{ getCar.priceMin }} ₽ до {{ getCar.priceMax }} ₽.
          <br>
          <br>
          Текущая цена {{ getPrice }} ₽
        </div>
        <div v-else-if="getPrice && isPriceValid">
          <b>Цена: </b>{{ getPrice }} ₽
        </div>
        <div v-else>
          <div>
            <b>
              Цена:
            </b>
            {{ 'от ' + getCar.priceMin + ' до ' + getCar.priceMax + ' ₽'}}
          </div>
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
      ]),
    ...mapGetters('model', ['getCar']),
    ...mapGetters('additional',
      [
        'getRentDuration',
        'getRate',
        'getOptions',
        'getPrice',
        'getColor',
        'isPriceValid',
      ])
  },
}
</script>
