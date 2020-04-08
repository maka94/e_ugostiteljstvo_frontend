import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
//import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import axios from "axios";
import VueAxios from "vue-axios";
//import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
//Vue.use(BootstrapVue);
//Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
