import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import LandPageView from "../views/LandPageView.vue";
import RegisterView from "../views/RegisterView.vue";
import ResidencesView from "../views/ResidencesView.vue";
import ProfileView from "../views/ProfileView.vue";
import CreateReservationView from "../views/CreateReservationView.vue";
import ReservationsView from "../views/ReservationsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LandPageView,
    /*meta: {
      requiresAuth: true
    }*/
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/residences",
    name: "residences",
    component: ResidencesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my_profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view_residence",
    name: "view_residence",
    component: CreateReservationView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "my_reservations",
    name: "reservations",
    component: ReservationsView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
