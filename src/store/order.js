import axiosApi from "../shared/axios";

export default {
  namespaced: true,
  state: {
    cities: [],
    currentCity: null,
    currentPoint: null,
    currentCityPoints: [],
    id: 1
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
    getPoints(state) {
      return state.currentCityPoints;
    },
    getCity(state) {
      return state.currentCity;
    },
    getPoint(state) {
      return state.currentPoint;
    },
    getLocationStatus(state) {
      const status = !(state.currentCity && state.currentPoint);
      return { id: state.id, isDisabled: status };
    }
  },
  mutations: {
    setCities(state, payload) {
      const cities = payload.map(el => ({
        ...el,
        coords: [],
      }));
      state.cities = cities;
    },
    setCity(state, payload) {
      state.currentCityPoints = [];
      state.currentPoint = null;
      state.currentCity = payload;
    },
    setPoints(state, payload) {
      const points = payload.map(el => ({
        ...el,
        coords: [],
      }));
      state.currentCityPoints = points;
    },
    setPoint(state, payload) {
      state.currentPoint = payload;
    },
    clearCity(state) {
      state.currentCity = null;
      state.currentPoint = null;
      state.currentCityPoints = [];
    },
    clearPoint(state) {
      state.currentPoint = null;
    }
  },
  actions: {
    async fetchPointCoords(context, payload) {
      try {
        const { data } = await axiosApi(request(payload.cityId.name + payload.address));
        const pointCoords = data.response.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
        payload.coords = Object.values(pointCoords.pos.split(" "));
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCityCoords(context, payload) {
      try {
        const { data } = await axiosApi(request(payload.name));
        const pointCoords = data.response.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
        payload.coords = Object.values(pointCoords.pos.split(" "));
        this.commit("order/setCity", payload);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCity(context) {
      try {
        const { data } = await axiosApi({
          url: "/city",
          method: "get"
        });
        context.commit("setCities", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCurrentCityPoints(context, payload) {
      try {
        const { data } = await axiosApi({
          url: "/point?cityId=" + payload,
          method: "get"
        });
        context.commit("setCityPoints", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async setCity(context, payload) {
      this.commit("home/setLoading", true);
      try {
        await context.dispatch("fetchCityCoords", payload);
        const { data } = await axiosApi({
          url: "/point?cityId=" + payload.id,
          method: "get"
        });
        context.commit("setPoints", data.data);
        const pointsWithCoords = context.getters.getPoints.map(el => {
          return context.dispatch("fetchPointCoords", el);
        });
        await Promise.all(pointsWithCoords).then(() => {
          this.commit("home/setLoading", false);
          this.commit("home/setMapStatus", true);
        });
      } catch (e) {
        this.commit("home/setLoading", false);
        throw e;
      }
    },
    async setPoint({ commit }, payload) {
      await commit("setPoint", payload);
    }
  }
};

const request = (geoCode) => {
  return {
    url: process.env.VUE_APP_API_YANDEX_GEO,
    method: "get",
    params: {
      apikey: process.env.VUE_APP_API_YANDEX_KEY,
      format: "json",
      geocode: geoCode
    }
  }
}

const handleError = (e) => {
  console.log('error: ' + e)
}