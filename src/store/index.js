import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    info: null,
    success: null
  },
  mutations: {
    setError(state, i18n) {
      state.error = i18n
    },
    clearError(state) {
      state.error = null
    },
    setInfo(state, i18n) {
      state.info = i18n
    },
    clearInfo(state) {
      state.info = null
    },
    setSuccess(state, i18n) {
      state.success = i18n
    },
    clearSuccess(state, i18n) {
      state.success = i18n
    }
  },
  getters: {
    error: s => s.error,
    info: s => s.info,
    success: s => s.success
  },
  actions: {

  },
  modules: {
    user
  }
})
