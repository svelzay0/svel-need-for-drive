import Vue from 'vue'
import Vuex from 'vuex'
import home from "./home";
import order from "./order";
import total from "./total";
import model from "./total";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    order,
    total,
    model
  }
});
