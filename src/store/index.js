import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";
import auth from "@/store/auth";
import company from "@/store/company";

Vue.use(Vuex)

function getDetailsData(response) {
  let details = [];
  if (response.status === 404) {
    details = ["error_404"]
  } else if (!Object.is(response.data, undefined)) {
    let data = Object.is(response.data.details, undefined) ? response.data : response.data.details;
    data.forEach(value => details.push(value))
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
    setError: (state, stack) => {
      state.information = {type: state.NotyType.ERROR, details: getDetailsData(stack.response)};
      if (stack.response.status === 401 || stack.response.status === 404) {

      }
    },
    setSuccess: (state, text) =>
        state.information = {type: state.NotyType.SUCCESS, details: [text]}
  },
  getters: {
    info: n => n.information
  },
  modules: {
    user, auth, company
  }
})
