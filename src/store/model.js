import axiosApi from "../shared/axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cars: [],
    car: null,
    category: [],
    id: 2,
    offset: 0
  },
  getters: {
    getCars(state) {
      return state.cars;
    },
    getOffset(state) {
      return state.offset;
    },
    getCar(state) {
      return state.car;
    },
    getModelStatus(state) {
      const status = !state.car;
      return { id: state.id, isDisabled: status };
    },
    getCarCategory(state) {
      return state.category;
    }
  },
  mutations: {
    setCars(state, payload) {
      state.cars = payload;
      const cats = ["Все модели"];
      payload.forEach(el => {
        if (el.categoryId !== null) {
          if (cats.includes(el.categoryId.name) === false) {
            cats.push(el.categoryId.name);
          }
        }
      });
      state.category = cats;
    },
    addCars(state, payload) {
      payload.forEach(el => {
        state.cars.push(el);
        if (el.categoryId !== null) {
          if (state.category.includes(el.categoryId.name) === false) {
            state.category.push(el.categoryId.name);
          }
        }
      });
    },
    setCar(state, payload) {
      if (payload.priceMin > payload.priceMax) {
        const priceMax = payload.priceMin;
        payload.priceMin = payload.priceMax;
        payload.priceMax = priceMax;
      }
      if (payload.colors.includes("Любой")) {
        state.car = payload;
      } else {
        payload.colors.unshift("Любой");
        state.car = payload;
      }
    },
    setOffset(state, payload) {
      state.offset = payload;
    },
  },
  actions: {
    async fetchModels(context) {
      if (context.getters.getOffset < 85) {
        this.commit("home/setLoading", true);
        try {
          const { data } = await axiosApi({
            url: "/car?offset=" + context.getters.getOffset + "&limit=10",
            method: "get"
          });
          if (context.getters.getOffset !== 0) {
            context.commit("addCars", data.data);
          }
          else {
            context.commit("setCars", data.data);
          }
          context.commit("setOffset", context.getters.getOffset + 10);
          this.commit("home/setLoading", false);
        } catch (e) {
          this.commit("home/setLoading", false);
          handleError(e);
        }
      }
    },
    setCar({ commit }, payload) {
      commit("setCar", payload);
    }
  }
};