<template>
  <div class="order__additional">
    <div v-if="getRates" class="additional__container">
      <div class="additional__form_block">
        <p class="additional__label">Цвет</p>
        <el-radio-group :value="radioColorsSelected || getCar.colors[0]">
          <el-radio
            v-for="color in getCar.colors"
            :key="color"
            :label="color"
            @change="setStoreColor(color)" />
        </el-radio-group>
      </div>
      <div class="additional__form_block">
        <p class="additional__label">Дата аренды</p>
        <div class="additional__date_container">
          <p class="additional__date_label">C</p>
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
          <p class="additional__date_label">По</p>
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
            >{{ rateRadioLabel(rate) }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="additional__form_block">
        <p class="additional__label">Доп услуги</p>
        <el-checkbox-group v-model="addOptions" class="additional__checkbox" text-color="#ffffff">
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
        disabledDate: el => {
          return el < new Date().setHours(0, 0, 0, 0);
        }
      },
      optionsDateTo: {
        disabledDate: el => {
          return el < this.dateFrom;
        }
      }
    };
  },
  computed: {
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
    this.setDefaultColor(this.defaultColor);
    this.fetchRates();
  },
  methods: {
    ...mapActions("additional", [
      "setPrice",
      "fetchRates",
      "setDateTo",
      "setDateFrom",
      "setColor"
    ]),
    ...mapMutations("additional", 
      [
        "setRentDuration", 
        "setOption", "setRate", 
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
      return `${opt.name},${opt.price}₽`;
    },
    calculateRent() {
      let adds = 0;
      this.getOptions.filter(el => {
        if (el.optValue === true) {
          adds += el.price;
        }
      });
      if (this.dateFrom !== "" && this.dateTo !== "") {
        const amount = this.dateTo - this.dateFrom;
        if (amount < 0) {
          this.rateTotal = null;
          this.rentDuration = null;
        } else {
          switch (this.getRate.rateTypeId.unit) {
            case "сутки": {
              let units = Math.floor(amount / 1000 / 60 / 60 / 24);
              if (units === 0) {
                units = 1;
              }
              this.rentDuration = { units: units, name: "д" };
              this.rateTotal = units * this.getRate.price + adds;
              if (this.getCar.priceMin <= this.rateTotal && this.rateTotal <= this.getCar.priceMax) {
                this.setPriceValid(true);
                break;
              } else {
                this.setPriceValid(false);
                break;
              }

            }
            case "7 дней": {
              let units = Math.ceil(amount / 1000 / 60 / 60 / 24 / 7);
              this.rentDuration = { units: units, name: "нед" };
              this.rateTotal = units * this.getRate.price + adds;
              if (this.getCar.priceMin <= this.rateTotal && this.rateTotal <= this.getCar.priceMax) {
                this.setPriceValid(true);
                break;
              } else {
                this.setPriceValid(false);
                break;
              }
            }
            case "мин": {
              const units = Math.floor(amount / 1000 / 60);
              this.rentDuration = { units: units, name: "мин" };
              this.rateTotal = units * this.getRate.price + adds;
              if (this.getCar.priceMin <= this.rateTotal && this.rateTotal <= this.getCar.priceMax) {
                this.setPriceValid(true);
                break;
              } else {
                this.setPriceValid(false);
                break;
              }
            }
          }
        }
      }
    }
  }
};
</script>