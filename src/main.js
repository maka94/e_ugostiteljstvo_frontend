import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import VueRouter from 'vue-router'
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
        next({
          name: 'home'
        })
      } else {
        next()
      }
  } else {
    next() 
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
