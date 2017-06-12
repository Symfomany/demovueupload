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


// Configure l'entête http au niveau de l'autorisation pour que chaquete requete soit signé avec l'entete Authorisation
// Voir aussi HTTP Header Authorization
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
// https://fr.wikipedia.org/wiki/Authentification_HTTP
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

