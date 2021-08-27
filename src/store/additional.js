import axiosApi from "../shared/axios";
import handleError from "../shared/error";

export default {
  namespaced: true,
  state: {
    addOptions: [
      {
        name: "Полный бак",
        price: 500,
        optName: "isFullTank",
        optValue: false
      },
      {
        name: "Детское кресло",
        price: 200,
        optName: "isNeedChildChair",
        optValue: false
      },
      {
        name: "Правый руль",
        price: 1600,
        optName: "isRightWheel",
        optValue: false
      }
    ],
    rates: [],
    rate: null,
    price: null,
    rentDuration: null,
    dateTo: null,
    dateFrom: null,
    color: null,
    id: 3,
    isPriceValid: true
  },
  getters: {
    isPriceValid(state) {
      return state.isPriceValid
    },
    getDateTo(state) {
      return state.dateTo
    },
    getDateFrom(state) {
      return state.dateFrom
    },
    getColor(state) {
      return state.color;
    },
    getRates(state) {
      return state.rates;
    },
    getOptions(state) {
      return state.addOptions;
    },
    getRate(state) {
      return state.rate;
    },
    getPrice(state) {
      return state.price;
    },
    getRentDuration(state) {
      return state.rentDuration;
    },
    getAdditionalStatus(state) {
      const status = !(
        state.rate &&
        state.price &&
        state.rentDuration &&
        state.dateFrom &&
        state.dateTo &&
        state.color &&
        state.isPriceValid
      );
      return { id: state.id, isDisabled: status };
    }
  },
  mutations: {
    setPriceValid(state, payload) {
      state.isPriceValid = payload
    },
    setDefaultColor(state, payload) {
      state.color = payload;
    },
    setColor(state, payload) {
      state.color = payload;
    },
    setDateFrom(state, payload) {
      state.dateFrom = payload;
    },
    setDateTo(state, payload) {
      state.dateTo = payload;
    },
    setRentDuration(state, payload) {
      state.rentDuration = payload;
    },
    setPrice(state, payload) {
      state.price = payload;
    },
    setRates(state, payload) {
      state.rates = payload;
    },
    setRate(state, payload) {
      state.rate = payload;
    },
    setOption(state, payload) {
      state.addOptions.map(el => ({
        ...el,
        optValue: payload.includes(el.name)
          ? (el.optValue = true)
          : (el.optValue = false)
      }));
      this.commit("total/setOptions", state.addOptions);
    }
  },
  actions: {
    async fetchRates({ commit }) {
      try {
        const { data } = await axiosApi({
          url: "/rate",
          method: "get"
        });
        commit("setRates", data.data);
      } catch (e) {
        handleError(e);
      }
    },
    setRate({ commit }, payload) {
      commit("setRate", payload);
    },
    setPrice({ commit }, payload) {
      commit("setPrice", payload);
    },
    setDateFrom({ commit }, payload) {
      commit("setDateFrom", payload);
    },
    setDateTo({ commit }, payload) {
      commit("setDateTo", payload);
    },
    setColor({ commit }, payload) {
      commit("setColor", payload);
    }
  }
};