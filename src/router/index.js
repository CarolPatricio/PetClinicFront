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
    meta: { requiresAuth: true },
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
        path: "clients/:id",
        name: "clients",
        component: () => import("../views/ClientForm.vue"),
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
        path: "pets/:id",
        name: "pets",
        component: () => import("../views/AnimalForm.vue"),
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
        path: "vets/:id",
        name: "vets",
        component: () => import("../views/VetForm.vue"),
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
        path: "appointments/:id",
        name: "appointments",
        component: () => import("../views/AppointmentForm.vue"),
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
      {
        path: "drugs/:id",
        name: "drugs",
        component: () => import("../views/DrugForm.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("@petclinic/access-token");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log("loggedIn", loggedIn);
  console.log("requiresAuth", requiresAuth);
  if (to.matched.some((record) => record.path.endsWith("/login")) && loggedIn) {
    next(`/`);
  }
  if (requiresAuth && !loggedIn) {
    next(`/login`);
  }
  next();
});
export default router;
