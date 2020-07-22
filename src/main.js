import 'es6-promise/auto'

import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import store from './store'
import axios from 'axios'
import routes from './index.routes'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$host = 'http://127.0.0.1:8080'
Vue.prototype.$rootpath = ''

import AppView from './components/App.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
sync(store, router)

Vue.mixin({
  data() {
    return {
      ROOT_FILE_PATH: "http://127.0.0.1:8080/files"
    }
  }
})
// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(AppView)
})

// change this. demo
window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
window.bugsnagClient.use(window.bugsnag__vue(Vue))
