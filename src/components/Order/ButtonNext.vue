<template>
  <div>
    <div v-if="(buttonView === 'withText')">
      <button
        v-if="getConfirmedOrder"
        class="price__button price__button_cancel"
        @click="reset"
      >
        Отменить
      </button>
      <button
        v-else
        class="price__button"
        :class="buttonClass"
        :disabled="buttonActive"
        @click="stepOver"
      >
        {{ currentStep.buttonText }}
      </button>
    </div>
    <div v-if="(buttonView === 'roundIcon')">
      <button
        v-if="getConfirmedOrder"
        class="el-icon-error button__icon button__icon_cancel"
        @click="reset"
      />
      <button
        v-else
        :class="iconClass"
        :disabled="buttonActive"
        class="el-icon-success button__icon"
        @click="stepOver"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ButtonNext',
  props: {
    buttonView: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('home',
      [
        'currentStep',
        'orderSteps'
      ]),
    ...mapGetters('total', ['getConfirmedOrder']),
    buttonActive() {
      if (this.currentStep.id === this.orderSteps.length) {
        return this.currentStep.isDisabled
      } else {
        return this.orderSteps[this.currentStep.id].isDisabled
      }
    },
    buttonClass() {
      if (this.currentStep.id === this.orderSteps.length) {
        return {
          price__button_disabled: this.currentStep.isDisabled,
        }
      } else {
        return {
          price__button_disabled: this.orderSteps[this.currentStep.id].isDisabled,
        }
      }
    },
    iconClass() {
      if (this.currentStep.id === this.orderSteps.length) {
        return {
          button__icon_disabled: this.currentStep.isDisabled,
        }
      } else {
        return {
          button__icon_disabled: this.orderSteps[this.currentStep.id].isDisabled,
        }
      }
    }
  },
  methods: {
    ...mapMutations('home',
      [
        'toNextStep',
        'setToFalsePriceVisible',
      ]),
    stepOver() {
      this.setToFalsePriceVisible()
      this.toNextStep()
    }
  },
}
</script>
