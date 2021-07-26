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
            placeholder="Начните вводить город..."
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
          <div class="location__autocomplete_label">Пункт Выдачи</div>
          <el-autocomplete
            v-model="point"
            class="inline-input"
            :fetch-suggestions="searchPoints"
            value-key="name"
            placeholder="Начните вводить пункт выдачи..."
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
      <span>Выбрать на карте</span>
    </div>
    <div class="location__map">
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
    ...mapGetters("order", ["getCities", "getPoints", "getCity", "getPoint"])
  },
  watch: {
    getPoint() {
      if (this.getPoint) {
        this.point = this.getPoint.name;
      }
    }
  },
  methods: {
    ...mapActions("order", ["setCity", "setPoint"]),
    ...mapMutations("order", ["clearCity", "clearPoint"]),
    selectCity(val) {
      this.point = "";
      this.setCity(val);
    },
    selectPoint(val) {
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

<style scoped lang="scss">
.location {
  grid-area: 1 / 1 / 22 / 33;
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  grid-template-rows: repeat(21, 1fr);
}
.location__form_container {
  grid-area: 1 / 3 / 6 / 13;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 325px;
}
.location__form {
  margin-top: 16px;
  height: auto;
  width: 325px;
}
.location__map {
  grid-area: 6 / 3 / 17 / 26;
  position: relative;
}
.location__autocomplete_label {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  margin-right: 8px;
  margin-top: 5px;
  margin-left: auto;
}
.location__form_block {
  display: flex;
}
.inline-input {
  width: 224px !important;
  }

// --------------------------------1340------------------------------------
@media screen and (max-width: $desktop-min) {
  .location__map {
    grid-area: 6 / 3 / 17 / 31;
  }
}
// --------------------------------1023------------------------------------
@media screen and (max-width: $tablet) {
  .location {
    grid-area: 1 / 1 / 22 / 45;
  }
  .location__map {
    grid-area: 6 / 2 / 17 / 32;
  }
}
</style>
