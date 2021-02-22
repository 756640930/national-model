import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //控制切换图层的弹窗
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