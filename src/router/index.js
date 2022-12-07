import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/Login.vue";
import BaseView from "../views/Base.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "base",
    component: BaseView,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "clients/new",
        name: "new-client",
        component: () => import("../views/ClientForm.vue"),
      },
      {
        path: "clients",
        name: "clients",
        component: () => import("../views/ClientList.vue"),
      },
      {
        path: "pets/new",
        name: "new-pet",
        component: () => import("../views/AnimalForm.vue"),
      },
      {
        path: "pets",
        name: "pets",
        component: () => import("../views/AnimalList.vue"),
      },
      {
        path: "vets/new",
        name: "new-vet",
        component: () => import("../views/VetForm.vue"),
      },
      {
        path: "vets",
        name: "vets",
        component: () => import("../views/VetList.vue"),
      },
      {
        path: "appointments/new",
        name: "new-appointment",
        component: () => import("../views/AppointmentForm.vue"),
      },
      {
        path: "appointments",
        name: "appointments",
        component: () => import("../views/AppointmentList.vue"),
      },
      {
        path: "drugs/new",
        name: "new-drug",
        component: () => import("../views/DrugForm.vue"),
      },
      {
        path: "drugs",
        name: "drugs",
        component: () => import("../views/DrugList.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
