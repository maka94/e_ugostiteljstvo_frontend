import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import TmpView from "../views/TmpView.vue";
import RegisterView from "../views/RegisterView.vue";
import ResidencesView from "../views/ResidencesView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: TmpView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/residences",
    name: "residences",
    component: ResidencesView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
