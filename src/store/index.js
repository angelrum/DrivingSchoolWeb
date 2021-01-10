import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";

Vue.use(Vuex)

function getDetailsData(response) {
  let details = [];
  if (response.status === 404) {
    details = ["error_404"]
  } else {
    response.data.details.forEach(value => details.push(value))
  }
  return details;
}

export default new Vuex.Store({
  state: {
    NotyType: {
      ERROR: "error",
      SUCCESS: "success"
    },
    information: null
  },
  mutations: {
    setError: (state, stack) =>
        state.information = {type: state.NotyType.ERROR, details: getDetailsData(stack.response)},
    setSuccess: (state, text) =>
        state.information = {type: state.NotyType.SUCCESS, details: [text]}
  },
  getters: {
    info: n => n.information
  },
  modules: {
    user
  }
})
