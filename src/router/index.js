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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
