import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css'

//подписываем запросы по-умолчанию
Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';
// // Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method, Access-Control-Request-Headers,Origin,Cache-Control, Content-Type, Authorization';
// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE';
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http.defaults.withCredentials = true;
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-csrf-token'] = token;
}
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
