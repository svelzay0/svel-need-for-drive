<template>
  <el-dialog
    :visible="isDialogVisible"
    width="40%"
    :show-close="false"
    center
    :modal="false"
  >
    <p class="dialog__text">Подтвердить заказ</p>
    <template
      slot="footer"
      class="dialog-footer"
    >
      <button
        class="dialog__button_confirm dialog__button_text"
        @click="confirm"
      >
        Подтвердить
      </button>
      <button
        class="dialog__button_close dialog__button_text"
        @click="close"
      >
        Вернуться
      </button>
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AcceptModal",
  computed: {
    ...mapGetters("home",
      [
        "isDialogVisible",
        'isPriceComponentVisible'
      ])
  },
  methods: {
    ...mapMutations('home', ['invertPriceVisible']),
    close() {
      if (this.isPriceComponentVisible) {
        this.invertPriceVisible();
      }
      this.$store.dispatch("home/setDialogStatus", false);
    },
    confirm() {
      this.$store.dispatch("total/pushOrder");
      if (this.isPriceComponentVisible) {
        this.invertPriceVisible();
      }
      this.close();
    }
  }
};
</script>
