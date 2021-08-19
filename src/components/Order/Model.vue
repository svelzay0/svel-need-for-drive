<template>
  <div v-if="getCars" class="order__model">
    <div class="model__car_class_switch">
      <el-radio-group v-model="radioSelected" text-color="green">
        <el-radio
          v-for="cat in getCarCategory"
          :key="cat"
          :label="cat"
        />
      </el-radio-group>
    </div>
    <div class="model__container">
      <div
        v-for="car in filteredCars"
        :key="car.id"
        :class="{
              model__car_card: car.id != currentCar.id,
              model__car_card_active: car.id == currentCar.id
            }"
        @click="selectCar(car)"
      >
        <div class="model__car_name">
          {{ getCarName(car) }}
        </div>
        <div class="model__car_cost">
          {{ car.priceMin }} - {{ car.priceMax }} ₽
        </div>
        <img
          class="model__car_image"
          :src="imgPath(car)"
          alt=""
          @error="defaultImage"
        />
      </div>
    </div>
    <div class="model__loading">
      <loader v-if="loading" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader";

export default {
  name: "Model",
  components: { Loader },
  data() {
    return {
      radioSelected: "Все модели",
      imgDefPath: require('@/assets/default_car.jpg'),
      currentCar: {
          id: null
      }
    };
  },
  computed: {
    ...mapGetters("model",
        [
            "getCars",
            "getCarCategory",
            "getCar"
        ]),
    ...mapGetters("home", ["loading"]),
    filteredCars() {
      if (this.radioSelected === "Все модели") {
        return this.getCars;
      }
      else {
        return this.getCars.filter(el => {
          if (el.categoryId != null) {
              if (el.categoryId.name === this.radioSelected) {
                  return el;
              }
          }
        });
      }
    }
  },
  mounted() {
    this.fetchModels();
  },
  methods: {
    ...mapActions("model",
        [
            "fetchModels",
            "setCar"
        ]),
    imgPath(car) {
      return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
    },
    getCarName(car) {
      return car.name.toUpperCase().split(",")[1]
        ? car.name.toUpperCase().split(",")[1]
        : car.name;
    },
    selectCar(car) {
      this.currentCar.id = car.id
      this.setCar(car);
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    }
  }
};
</script>
