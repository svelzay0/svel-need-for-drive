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
    <!-- <price v-show="getWindowWidth > tablet" />
    <i v-if="getWindowWidth < tablet" class="el-icon-shopping-cart-1 order__button_price" @click="showPrice"/>
    <el-dialog :show-close="false" :visible="isPriceStepVisible">
      <price />
    </el-dialog>
    <dialog-app />
    <button-next v-if="getWindowWidth < tablet && !isPriceStepVisible" :button-view="'roundIcon'"/> -->
  </div>  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import HeaderMenu from "@/components/HeaderMenu";
import Location from '@/components/Order/Location'

export default {
  name: "Order",
  computed: {
    ...mapGetters('home', ['orderSteps', 'currentStep', 'getWindowWidth', 'tablet', 'isPriceStepVisible']),
  },
  components: {
    HeaderMenu,
    Location
  },
  methods: {
    showPrice() {
      this.invertPriceVisible();
    },
    ...mapMutations('home', ['setStepStatus', 'setCurrentStep', 'invertPriceVisible']),
    ...mapActions('total', ['fetchOrderStatus']),
    changeCurrentStep(step) {
      this.setCurrentStep(step)
    }
  },  
};
</script>
