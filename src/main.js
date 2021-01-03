import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";
import axios from "axios";
import VueAxios from "vue-axios";
import VueNoty from "vuejs-noty"
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueNoty, {
  timeout: 3000,
  progressBar: true,
  layout: 'bottomRight'
})
// Vue.directive('icon', { update (el) {
//     el.querySelectorAll('.v-icon.v-icon--disabled')
//         .forEach(el => el.classList.remove('v-icon--disabled')) }
// })

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
