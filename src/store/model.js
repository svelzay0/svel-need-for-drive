import axiosApi from "../shared/axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    cars: [],
    car: null,
    category: [],
    id: 2
  },
  getters: {
    getCars(state) {
      return state.cars;
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
    setCar(state, payload) {
      if (payload.priceMin > payload.priceMax) {
        const priceMax = payload.priceMin
        payload.priceMin = payload.priceMax
        payload.priceMax = priceMax
      }
      if (payload.colors.includes("Любой")) {
        state.car = payload;
      } else {
        payload.colors.unshift("Любой");
        state.car = payload;
      }
    }
  },
  actions: {
    async fetchModels(context) {
      this.commit("home/setLoading", true);
      try {
        const { data } = await axiosApi({
          url: "/car",
          method: "get"
        });
        context.commit("setCars", data.data);
        this.commit("home/setLoading", false);
      } catch (e) {
        this.commit("home/setLoading", false);
        handleError(e);
      }
    },
    setCar({ commit }, payload) {
      commit("setCar", payload);
    }
  }
};
