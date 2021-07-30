import axiosApi from "../shared/axios";

export default {
  namespaced: true,
  state: {
    order: {
      orderStatusId: null,
      cityId: {},
      pointId: {},
      carId: {},
      color: "",
      dateFrom: null,
      dateTo: null,
      rateId: {},
      price: null
    },
    confirmedOrder: null
  },
  getters: {
    getConfirmedOrder(state) {
      return state.confirmedOrder;
    },
    getOrder(state, getters, rootState, rootGetters) {
      state.order.cityId = rootGetters["order/getCity"]
      state.order.pointId = rootGetters["order/getPoint"]
      state.order.carId = rootGetters["model/getCar"]
      state.order.color = rootGetters["additional/getColor"]
      state.order.dateFrom = rootGetters["additional/getDateFrom"]
      state.order.dateTo = rootGetters["additional/getDateTo"]
      state.order.rateId = rootGetters["additional/getRate"]
      state.order.price = rootGetters["additional/getPrice"]
      return state.order
    }
  },
  mutations: {
    setOrderId(state, payload) {
      state.order.orderStatusId = payload;
    },
    setOptions(state, payload) {
      payload.map(el => {
        state.order[el.optName] = el.optValue;
      });
    },
    setOrder(state, payload) {
      state.confirmedOrder = payload;
    }
  },
  actions: {
    async fetchOrderStatus({ commit }) {
      const { data } = await axiosApi({
        url: "/orderStatus",
        method: "get"
      });
      commit("setOrderId", data.data[0]);
    },
    setColor({ commit }, payload) {
      commit("setColor", payload);
    },
    async pushOrder(context) {
      const order = JSON.parse(JSON.stringify(context.state.order));
      const { data } = await axiosApi({
        url: "/order",
        method: "post",
        data: order
      });
      context.commit("setOrder", data.data);
    },
    clearConfirmedOrder({ commit }) {
      commit("setOrder", null);
    }
  }
};
