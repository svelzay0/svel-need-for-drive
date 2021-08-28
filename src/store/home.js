export default {
  namespaced: true,
  state: {
    isBurgerActive: false,
    isDialogVisible: false,
    isPriceComponentVisible: false,
    isMapReady: false,
    windowWidth: null,
    loading: false,
    tablet: 1023,
    currentStep: null,
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
        url: "location",
        tag: "Местоположение",
        isActive: true,
        isDisabled: false,
        buttonText: "Выбрать модель"
      },
      {
        id: 2,
        name: "Model",
        url: "model",
        tag: "Модель",
        isActive: false,
        isDisabled: true,
        buttonText: "Дополнительно"
      },
      {
        id: 3,
        name: "Additional",
        url: "additional",
        tag: "Дополнительно",
        isActive: false,
        isDisabled: true,
        buttonText: "Итого"
      },
      {
        id: 4,
        name: "Total",
        url: "total",
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
    slidesLength(state) {
      return state.slides.length;
    },
    orderSteps(state) {
      return state.orderSteps;
    },
    currentStep({ currentStep, orderSteps }) {
      return currentStep || orderSteps[0];
    },
    getWindowWidth(state) {
      return state.windowWidth
    },
    tablet(state) {
      return state.tablet
    },
    loading(state) {
      return state.loading;
    },
    isMapReady(state) {
      return state.isMapReady;
    },
    isDialogVisible(state) {
      return state.isDialogVisible;
    },
    isPriceComponentVisible(state) {
      return state.isPriceComponentVisible
    },
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
    },
    setDialogStatus(state, payload) {
      state.isDialogVisible = payload;
    },
    setCurrentStep(state, payload) {
      if (typeof payload === 'string') {
        state.currentStep.url = payload
      }
      else {
        state.orderSteps.map(el => {
          if (el.name === payload.name) {
            el.isActive = true;
            state.currentStep = el;
          } else {
            el.isActive = false;
          }
          return el;
        });
      }
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
      this.loading = true
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
          } else {
            el.isActive = false;
          }
          return el;
          
        });
      }
    },
    invertPriceVisible(state) {
      state.isPriceComponentVisible = !state.isPriceComponentVisible
    },
    setToFalsePriceVisible(state) {
      state.isPriceComponentVisible = false
    },
    destroyIdUrl(state) {
      state.currentStep.url = 'total';
    }
  },
  actions: {
    toggleBurgerMenu({ commit }) {
      commit("toggleBurgerMenu");
    },
    toNextStep({ commit }) {
      commit("toNextStep");
    },
    setDialogStatus({ commit }, payload) {
      commit("setDialogStatus", payload);
    }
  }
};
