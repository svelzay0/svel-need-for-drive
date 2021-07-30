export default {
  namespaced: true,
  state: {
    isBurgerActive: false,
    isPriceSteptVisible: false,
    windowWidth: null,
    loading: false,
    isMapReady: false,
    tablet: 1023,
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
    orderSteps: [
      {
        id: 1,
        name: "Location",
        tag: "Местоположение",
        isActive: true,
        isDisabled: false,
        buttonText: "Выбрать модель"
      },
      {
        id: 2,
        name: "Model",
        tag: "Модель",
        isActive: false,
        isDisabled: true,
        buttonText: "Дополнительно"
      },
      {
        id: 3,
        name: "Additional",
        tag: "Дополнительно",
        isActive: false,
        isDisabled: true,
        buttonText: "Итого"
      },
      {
        id: 4,
        name: "Total",
        tag: "Итого",
        isActive: false,
        isDisabled: true,
        buttonText: "Заказать"
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
    },
    orderSteps(state) {
      return state.orderSteps;
    },
    currentStep(state) {
      return state.currentStep
        ? state.currentStep
        : state.orderSteps[0];
    },
    setCurrentStep(state, payload) {
      state.orderSteps.map(el => {
        if (el.name === payload.name) {
          el.isActive = true;
          state.currentStep = el;
          return el;
        } else {
          el.isActive = false;
          return el;
        }
      });
    },
    setStepStatus(state, payload) {
      if (payload.isDisabled === false) {
        if (payload.id === state.orderSteps.length) {
          state.orderSteps[state.orderSteps.length - 1].isDisabled = payload.isDisabled;
        } else {
          state.orderSteps[payload.id].isDisabled = false;
        }
      } else {
        state.orderSteps.map(el => {
          if (el.id > payload.id) {
            el.isDisabled = true;
            return el;
          }
        });
      }
    },
    toNextStep(state) {
      let nextStepId;
      if (state.currentStep) {
        nextStepId = state.currentStep.id;
      } else {
        nextStepId = state.orderSteps[0].id;
        state.currentStep = state.orderSteps[0];
      }
      if (nextStepId === state.orderSteps.length) {
        state.isDialogVisible = true;
      } else {
        nextStepId += 1;
        state.currentStep = state.orderSteps.find(el => {
          if (el.id === nextStepId) {
            return el;
          }
        });
        state.orderSteps.map(el => {
          if (el.name === state.currentStep.name) {
            el.isActive = true;
            return el;
          } else {
            el.isActive = false;
            return el;
          }
        });
      }
    },
    getWindowWidth(state) {
      return state.windowWidth
    },
    isPriceStepVisible(state) {
      return state.isPriceStepVisible
    },
    tablet(state) {
      return state.tablet
    },
    loading(state) {
      return state.loading;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    isMapReady(state) {
      return state.isMapReady;
    },
    setMapStatus(state, payload) {
      state.isMapReady = payload;
    }
  },
  mutations: {
    toggleBurgerMenu(state) {
      state.isBurgerActive = !state.isBurgerActive;
    },
    setWindowWidth(state, payload) {
      state.windowWidth = payload
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setMapStatus(state, payload) {
      state.isMapReady = payload;
    }
  },
  actions: {
    toggleBurgerMenu({ commit }) {
      commit("toggleBurgerMenu");
    }
  }
};
