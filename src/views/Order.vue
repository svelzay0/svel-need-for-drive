<template>
  <div class="order">
    <div class="order__header">  
      <header-menu />
    </div>
    <nav class="order__nav">
      <div class="order__steps">
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
          :is="step.name"
          v-if="currentStep.name === step.name" 
        />
      </keep-alive>
    </div>
    <price v-show="getWindowWidth > tablet" />
    <i v-if="getWindowWidth < tablet" class="el-icon-shopping-cart-1 order__button_price" @click="showPrice"/>
    <el-dialog :show-close="false" :visible="isPriceStepVisible">
      <price />
    </el-dialog>
    <!-- шаблон подтвержения заказа, в разработке -->
    <!-- <accept-modal /> --> 
    <button-next v-if="getWindowWidth < tablet && !isPriceStepVisible" :button-view="'roundIcon'"/>
  </div>  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import HeaderMenu from "@/components/HeaderMenu";
import Location from '@/components/Order/Location'
import Price from '@/components/Order/Price'
import ButtonNext from "@/components/Order/ButtonNext";
import AcceptModal from "@/components/Order/AcceptModal";

export default {
  name: "Order",
  computed: {
    ...mapGetters('home', 
      [
        'orderSteps',
        'currentStep',
        'getWindowWidth',
        'tablet', 
        'isPriceStepVisible',
      ]),
    ...mapGetters('order', ['getLocationStatus']),  
  },
  components: {
    HeaderMenu,
    Location,
    Price,
    ButtonNext,
    AcceptModal
  },
  watch: {
    getLocationStatus(newVal) {
      this.setStepStatus(newVal)
    }
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
    }
  },  
};
</script>
