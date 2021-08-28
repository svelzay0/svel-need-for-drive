<template>
  <div class="location">
    <div class="location__form_container">
      <form name="order_form" class="location__form">
        <div class="location__form_block">
          <div class="location__autocomplete_label">Город</div>
          <el-autocomplete
            v-model="city"
            class="inline-input"
            :fetch-suggestions="searchCities"
            value-key="name"
            placeholder="Введите город..."
            @select="selectCity"
          >
            <i
              v-show="city"
              slot="suffix"
              class="form__clear"
              @click="clearIconCity"
            >
            </i>
          </el-autocomplete>
        </div>
        <div class="location__form_block">
          <div class="location__autocomplete_label">
            Пункт выдачи
          </div>
          <el-autocomplete
            v-model="point"
            class="inline-input"
            :fetch-suggestions="searchPoints"
            value-key="name"
            placeholder="Введите пункт..."
            @select="selectPoint"
          >
            <i
              v-show="point"
              slot="suffix"
              class="form__clear"
              @click="clearIconPoint"
            >
            </i>
          </el-autocomplete>
        </div>
      </form>
    </div>
    <div class="location__map">
      <span
        v-if="isMapReady && getCity"
        class="map__picker"
      >
        Выбрать на карте:
      </span>
      <map-app />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import MapApp from "@/components/Order/MapApp";

export default {
  name: "Location",
  components: { MapApp },
  data() {
    return {
      labelCity: "Город",
      labelPoint: "Пункт Выдачи",
      filteredCities: [],
      toggle: false,
      city: "",
      point: ""
    };
  },
  computed: {
    ...mapGetters("order",
      [
        "getCities",
        "getPoints",
        "getCity",
        "getPoint"
      ]),
    ...mapGetters("home", 
      [
        "currentStep",
        "isMapReady"
      ]),
  },
  mounted() {
    this.$router.push({ name: 'Order', params: { stepName: this.currentStep.url } })
  },
  watch: {
    getPoint: function (value) {
      if (value) {
        this.point = value.name
      }
    },
    getCity: function (value) {
      if (value) {
        this.city = value.name
      }
    }
  },
  methods: {
    ...mapActions("order",
      [
        "setCity",
        "setPoint",
        "fetchPoints"
      ]),
    ...mapMutations("order",
      [
        "clearCity",
        "clearPoint"
      ]),
    selectCity(val) {
      this.point = "";
      this.setCity(val);
    },
    selectPoint(val) {
      val.currentCity = this.getCity
      val.cities = this.getCities
      this.setPoint(val);
    },
    clearIconCity() {
      this.point = "";
      this.city = "";
      this.clearCity();
    },
    clearIconPoint() {
      this.point = "";
      this.clearPoint();
    },
    searchCities(queryString, cb) {
      const results = queryString
        ? this.getCities.filter(this.createFilter(queryString))
        : this.getCities;
      cb(results);
    },
    searchPoints(queryString, cb) {
      const results = queryString
        ? this.getPoints.filter(this.createFilter(queryString))
        : this.getPoints;
      cb(results);
    },
    createFilter(queryString) {
      return link => {
        return link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    }
  }
};
</script>