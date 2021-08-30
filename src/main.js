import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.scss'
import "./styles/theme/index.css";
import Slider from "vue-easy-slider";
import locale from "element-ui/lib/locale/lang/ru-RU";
import ElementUI from "element-ui";
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(Slider);
Vue.use(ElementUI, { locale });
Vue.use(infiniteScroll);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')