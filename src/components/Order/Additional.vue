<template>
  <div class="order__additional">
    <div
      v-if="getRates"
      class="additional__container"
    >
      <div class="additional__form_block">
        <p class="additional__label">Цвет</p>
        <el-radio-group :value="radioColorsSelected || getCar.colors[0]">
          <el-radio
            v-for="color in getCar.colors"
            :key="color"
            :label="color"
            @change="setStoreColor(color)"
          />
        </el-radio-group>
      </div>
      <div class="additional__form_block">
        <p class="additional__label">Дата аренды</p>
        <div class="additional__date_container">
          <p class="additional__date_label_first">C</p>
          <el-date-picker
            v-model="dateFrom"
            :picker-options="optionsDateFrom"
            type="datetime"
            editable
            :clearable="true"
            clear-icon="form__clear"
            format="dd-MM-yyyy HH:mm"
            placeholder="Введите дату и время"
            @change="setStoreDateFrom"
          />
        </div>
        <div class="additional__date_container">
          <p class="additional__date_label_second">По</p>
          <el-date-picker
            v-model="dateTo"
            :picker-options="optionsDateTo"
            type="datetime"
            editable
            :clearable="true"
            clear-icon="form__clear"
            format="dd-MM-yyyy HH:mm"
            placeholder="Введите дату и время"
            @change="setStoreDateTo"
          />
        </div>
      </div>
      <div class="additional__form_block">
        <p class="additional__label">Тариф</p>
        <el-radio-group v-model="radioRateSelected">
          <el-radio
            v-for="rate in getRates"
            :key="rate.id"
            :label="rate.rateTypeId.name"
            @change="setStoreRate(rate)"
          >
            {{ rateRadioLabel(rate) }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="additional__form_block">
        <p class="additional__label">Доп услуги</p>
        <el-checkbox-group v-model="addOptions">
          <el-checkbox
            v-for="opt in getOptions"
            :key="opt.name"
            :label="opt.name"
            @change="setStoreOptions()"
          >
            {{ optionCheckboxLabel(opt) }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Additional",
  data() {
    return {
      radioColorsSelected: "",
      addOptions: [],
      radioRateSelected: "",
      dateTo: "",
      dateFrom: "",
      defaultColor: "Любой",
      optionsDateFrom: {
        disabledDate: el => el < new Date().setHours(0, 0, 0, 0)
      },
      optionsDateTo: {
        disabledDate: el => el < this.dateFrom
      }
    };
  },
  computed: {
    ...mapGetters("home", ["currentStep"]),
    ...mapGetters("model", ["getCar"]),
    ...mapGetters("additional",
      [
        "getRates",
        "getOptions",
        "getColor",
        "getRate",
        "getPrice",
        "getRentDuration",
        "isPriceValid"
      ]),
    rateTotal: {
      get() {
        return this.getPrice;
      },
      set(val) {
        this.setPrice(val);
      }
    },
    rentDuration: {
      get() {
        return this.getRentDuration;
      },
      set(val) {
        this.setRentDuration(val);
      }
    }
  },
  mounted() {
    this.$router.push({ name: 'Order', params: { stepName: this.currentStep.url } });
    this.setDefaultColor(this.defaultColor);
    this.fetchRates();
  },
  methods: {
    ...mapActions("additional",
      [
        "setPrice",
        "fetchRates",
        "setDateTo",
        "setDateFrom",
        "setColor"
      ]),
    ...mapMutations("additional",
      [
        "setRentDuration",
        "setOption",
        "setRate",
        "setPriceValid",
        "setDefaultColor"
      ]),
    setStoreDateTo() {
      if (!this.dateTo) {
        this.rentDuration = null;
        this.rateTotal = null;
      }
      this.setDateTo(this.dateTo);
      if (this.radioRateSelected && this.dateFrom && this.dateTo) {
        this.calculateRent();
      }
    },
    setStoreDateFrom() {
      if (!this.dateFrom) {
        this.rentDuration = null;
        this.rateTotal = null;
      }
      this.setDateFrom(this.dateFrom);
      if (this.radioRateSelected && this.dateFrom && this.dateTo) {
        this.calculateRent();
      }
    },
    setStoreOptions() {
      this.setOption(this.addOptions);
      if (this.radioRateSelected && this.dateFrom && this.dateTo) {
        this.calculateRent();
      }
    },
    setStoreColor(color) {
      this.radioColorsSelected = color;
      this.setColor(color);
    },
    setStoreRate(rate) {
      this.setRate(rate);
      if (this.radioRateSelected && this.dateFrom && this.dateTo) {
        this.calculateRent();
      }
    },
    rateRadioLabel(rate) {
      return `${rate.rateTypeId.name}, ${rate.price} ₽/${rate.rateTypeId.unit}`;
    },
    optionCheckboxLabel(opt) {
      return `${opt.name}, ${opt.price}₽`;
    },
    calculateRent() {
      const adds = this.getOptions.reduce((sum, el) => el.optValue ? sum + el.price : sum, 0);
      if (this.dateFrom && this.dateTo) {
        const amount = this.dateTo - this.dateFrom;
        if (amount < 0) {
          this.rateTotal = null;
          this.rentDuration = null;
        }
        else {
          this.fillableRateAndRent(amount, this.getRate.rateTypeId.unit, adds);
        }
      }
    },
    fillableRateAndRent (amount, unit, adds) {
      switch (unit) {
        case "сутки": {
          const dayUnits = Math.floor(amount / 1000 / 60 / 60 / 24) || 1;
          this.setPriceValidBoolean(dayUnits, "д", adds);
          break;
        }
        case "7 дней": {
          const weekUnits = Math.ceil(amount / 1000 / 60 / 60 / 24 / 7);
          this.setPriceValidBoolean(weekUnits, "нед", adds);
          break;
        }
        case "мин": {
          const minUnits = Math.floor(amount / 1000 / 60);
          this.setPriceValidBoolean(minUnits, "мин", adds);
          break;
        }
      }
    },
    setPriceValidBoolean (someUnits, prefix, adds) {
      this.rentDuration = { units: someUnits, name: prefix };
      this.rateTotal = someUnits * this.getRate.price + adds;
      const priceValid = this.getCar.priceMin <= this.rateTotal && this.rateTotal <= this.getCar.priceMax;
      this.setPriceValid(priceValid);
    }
  }
};
</script>