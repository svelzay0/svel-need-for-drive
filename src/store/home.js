export default {
  namespaced: true,
  state: {
    isBurgerActive: false,
    slides: [
      {
        id: 1,
        image: "./images/slide1.jpg",
        title: "Бесплатная парковка",
        desc:
          "Оставляйте машину на платных городских парковках и " +
          "разрешенных местах, не нарушая ПДД, а также в аэропортах.",
        btnDesc: "Подробнее",
        background: "background: linear-gradient(90deg,"+"#13493F 0%, #0C7B1B 100%);"
      },
      {
        id: 2,
        image: "./images/slide2.jpg",
        title: "Страховка",
        desc: "Полная страховка страховка автомобиля",
        btnDesc: "Подробнее",
        background: "background: linear-gradient(90deg,"+"#132949 0%, #0C7B67 100%);"
      },
      {
        id: 3,
        image: "./images/slide3.jpg",
        title: "Бензин",
        desc: "Полный бак на любой заправке города за наш счёт",
        btnDesc: "Подробнее",
        background: "background: linear-gradient(90deg,"+"#493013 0%, #7B0C3B 100%);"
      },
      {
        id: 4,
        image: "./images/slide4.jpg",
        title: "Обслуживание",
        desc: "Автомобиль проходит еженедельное ТО",
        btnDesc: "Подробнее",
        background: "background: linear-gradient(90deg,"+"#281349 0%, #720C7B 100%);"
      }
    ],
    menuItems: [
      {
        id: 1,
        name: "Парковка"
      },
      {
        id: 2,
        name: "Страховка"
      },
      {
        id: 3,
        name: "Бензин"
      },
      {
        id: 4,
        name: "Обслуживание"
      }
    ]
  },
  getters: {
    isMenuActive(state) {
      return state.isBurgerActive;
    },
    menuItems(state) {
      return state.menuItems;
    },
    slides(state) {
      return state.slides;
    }
  },
  mutations: {
    toggleBurgerMenu(state) {
      state.isBurgerActive = !state.isBurgerActive;
    }
  },
  actions: {
    toggleBurgerMenu({ commit }) {
      commit("toggleBurgerMenu");
    }
  }
};
