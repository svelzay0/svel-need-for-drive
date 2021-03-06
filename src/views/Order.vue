<template>
  <div class="order">
    <div class="order__header">
      <header-menu />
    </div>
    <nav class="order__nav">
      <div
        v-if="getConfirmedOrder"
        class="order__finish"
      >
        <p class="order__order__number">
          Заказ номер {{ getConfirmedOrder.id }}
        </p>
      </div>
      <div
        v-else
        class="order__steps"
      >
        <div
          v-for="step in orderSteps"
          :key="step.id"
          class="order__step__container"
        >
          <button
            class="order__step"
            :disabled="step.isDisabled"
            :class="{
              order__step_active: step.isActive,
              order__step_disabled: step.isDisabled,
              order__step_finished: !step.isDisabled,
            }"
            @click="changeCurrentStep(step)"
          >
            {{ step.tag }}
          </button>
          <div class="order__arrow" />
        </div>
      </div>
    </nav>
    <div
      v-for="step of orderSteps"
      :key="step.id"
      class="order__component_container"
    >
      <keep-alive>
        <component
          v-if="currentStep.name === step.name"
          :is="step.name"
        />
      </keep-alive>
    </div>
    <price v-show="getWindowWidth > tablet" />
    <i
      v-if="getWindowWidth < tablet"
      :class="{
        'el-icon-shopping-cart-1 order__button_price': isPriceValid,
        'el-icon-shopping-cart-1 order__button_price_error': !isPriceValid
      }"
      @click="showPrice"
    />
    <el-dialog
      :show-close="false"
      :visible="isPriceComponentVisible"
    >
      <price
        :vision="isPriceComponentVisible"
        @close="closeModal"
      />
    </el-dialog>
    <accept-modal />
    <button-next
      v-if="getWindowWidth < tablet
      && !isPriceComponentVisible"
      :button-view="'roundIcon'"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import HeaderMenu from "@/components/HeaderMenu"
import Location from '@/components/Order/Location'
import Price from '@/components/Order/Price'
import ButtonNext from "@/components/Order/ButtonNext"
import AcceptModal from "@/components/Order/AcceptModal"
import Model from '@/components/Order/Model'
import Additional from '@/components/Order/Additional'
import Total from '@/components/Order/Total'

export default {
  name: "Order",
  computed: {
    ...mapGetters('home',
      [
        'orderSteps',
        'currentStep',
        'getWindowWidth',
        'tablet',
        'isPriceComponentVisible'
      ]),
    ...mapGetters('order', ['getLocationStatus']),
    ...mapGetters('model', ['getModelStatus']),
    ...mapGetters('additional',
      [
        'getAdditionalStatus',
        'isPriceValid'
      ]),
    ...mapGetters('total', ['getConfirmedOrder']),
  },
  components: {
    HeaderMenu,
    Location,
    Price,
    ButtonNext,
    AcceptModal,
    Model,
    Additional,
    Total
  },
  watch: {
    getLocationStatus(newVal) {
      this.setStepStatus(newVal)
    },
    getModelStatus(newVal) {
      this.setStepStatus(newVal)
    },
    getAdditionalStatus(newVal) {
      this.setStepStatus(newVal)
    },
    getConfirmedOrder(newVal) {
      if (newVal) {
        this.setCurrentStep(newVal.id)
        this.$router.push({ name: 'Order', params: { stepName: newVal.id } })
      }  
    },
  },
  mounted() {
    this.fetchOrderStatus()
  },
  methods: {
    showPrice() {
      this.invertPriceVisible();
    },
    ...mapMutations('home',
      [
        'setStepStatus',
        'setCurrentStep',
        'invertPriceVisible'
      ]),
    ...mapActions('total', ['fetchOrderStatus']),
    changeCurrentStep(step) {
      this.setCurrentStep(step)
      this.$router.push({ name: 'Order', params: { stepName: step.url } })
    },
    closeModal() {
      this.invertPriceVisible();
    }
  },
};
</script>
