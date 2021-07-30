<template>
  <div class="location__map__container">
    <yandex-map
      v-if="isMapReady && getCity"
      :settings="settings"
      :coords="coords"
      :zoom="zoom"
      style="height: 100%; width: 100%"
    >
      <ymap-marker
        v-for="point in getPoints"
        :key="point.id"
        :marker-id="point.id"
        :coords="point.coords"
        :icon="markerIcon"
        :hint-content="`${point.name},  ${point.address}`"
        @click="markerOnCenter(point)"
      />
    </yandex-map>
    <loader v-if="loading" />
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader";

export default {
  name: "MapApp",
  components: { yandexMap, ymapMarker, Loader },
  data() {
    return {
      settings: {
        apiKey: "aa6f4e19-0980-483f-9d50-f10ab3111593",
        lang: "ru_RU",
        coordorder: "longlat",
        version: "2.1"
      },
      zoom: 12,
      markerIcon: {
        layout: "default#imageWithContent",
        imageHref: require("@/assets/map_marker.svg"),
        imageSize: [18, 18],
        imageOffset: [0, 0]
      }
    };
  },
  computed: {
    ...mapGetters("order", ["getPoints", "getPoint", "getCity"]),
    ...mapGetters("home", ["loading", "isMapReady"]),
    coords() {
      return this.getPoint ? this.getPoint.coords : this.getCity.coords;
    }
  },
  methods: {
    ...mapActions("order", ["setPoint"]),
    markerOnCenter(point) {
      this.setPoint(point);
    }
  }
};
</script>

<style scoped>
  .location__map__container {
    width: 100%;
    height: calc(100vh / 25 * 11);
  }
</style>
