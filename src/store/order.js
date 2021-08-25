import axiosApi from "../shared/axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cities: [],
    points: [],
    currentCity: null,
    currentPoint: null,
    isCurrentCityDefined: true,
    currentCityPoints: [],
    id: 1
  },
  getters: {
    getCities(state)
    {
      return state.cities;
    },
    getAllPoints(state) {
      return state.points;
    },
    getBooleanCurrentCityDefined(state) {
      return state.isCurrentCityDefined;
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
    setBooleanCurrentCityDefined(state, payload) {
      state.isCurrentCityDefined = payload;
    },
    setCities(state, payload) {
      const cities = payload.map(el => ({
        ...el,
        coords: [],
      }));
      state.cities = cities;
    },
    setAllPoints(state, payload) {
      if (state.points.length < 1) {
        const points = payload.map(el => ({
          ...el,
          coords: [],
        }));
        state.points = points;
      }
      state.currentCityPoints = state.points
    },
    setCity(state, payload) {
      state.currentCityPoints = [];
      state.currentPoint = null;
      state.currentCity = payload;
    },
    setPoints(state, payload) {
      state.currentCityPoints = [];
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
      state.currentCityPoints = state.points;
    },
    clearPoint(state) {
      state.currentPoint = null;
    }
  },
  actions: {
    async fetchCityCoords(context, payload) {
      try {
        const { data } = await axiosApi(YandexMapsRequest(payload.name));
        const pointCoords = data.response.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
        payload.coords = Object.values(pointCoords.pos.split(" "));
        this.commit("order/setCity", payload);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchPointCoords(context, payload) {
      try {
        const { data } = await axiosApi(YandexMapsRequest(payload.cityId.name + payload.address));
        const pointCoords = data.response.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
        payload.coords = Object.values(pointCoords.pos.split(" "));
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCity(context) {
      try {
        const { data } = await axiosApi(ApiRequest("/city"));
        context.commit("setCities", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchPoints(context) {
      try {
        const { data } = await axiosApi(ApiRequest("/point"));
        const points = data.data.filter(element => element.cityId !== null);
        context.commit("setAllPoints", points);
      } catch (e) {
        handleError(e);
      }
    },
    async fetchCurrentCityPoints(context, payload) {
      try {
        const { data } = await axiosApi(ApiRequest("/point?cityId=" + payload));
        context.commit("setCityPoints", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    async setCity(context, payload) {
      this.commit("home/setLoading", true);
      try {
        await context.dispatch("fetchCityCoords", payload);
        const { data } = await axiosApi(ApiRequest("/point?cityId=" + payload.id));
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
        handleError(e);
      }
    },
    async setPoint(context, payload) {
      if (payload.currentCity === null) {
        const city = payload.cities.filter(element => element.name === payload.cityId.name)
        try {
          await context.dispatch('setCity', city[0]);
          await context.dispatch("fetchPointCoords", payload);
        } catch (e) {
          this.commit("home/setLoading", false);
          handleError(e);
        }
      }
      await context.commit("setPoint", payload);
    }
  }
};

const YandexMapsRequest = (geoCode) => {
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

const ApiRequest = (url) => {
  return {
    url: url,
    method: "get"
  }
}