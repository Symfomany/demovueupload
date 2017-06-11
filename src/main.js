// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Store from '@/Store.js'
Store.checkAuth();

import router from './router'
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import Toasted from 'vue-toasted';

Vue.use(Toasted)
Vue.use(VeeValidate);
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


// Configure l'entete http au niveau de l'autorisation
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

