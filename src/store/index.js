import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    ifLayerModal: false
  },
  mutations: {
    isLayerModal(state) {
      state.ifLayerModal = true
    },
    notLayerModal(state) {
      state.ifLayerModal = false
    },
  }
})

export default store