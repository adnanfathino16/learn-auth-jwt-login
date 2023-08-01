import { createWebHashHistory, createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Daftar from "../views/Daftar.vue";
import Dashboard from "../views/Dashboard.vue";
import LupaPassword from "../views/LupaPassword.vue";
import Intro from "../views/Intro.vue";
import ResetPassword from "../views/ResetPassword.vue";

const routes = [
  {
    path: "/",
    name: "intro",
    component: Intro,
  },
  {
    path: "/daftar",
    name: "daftar",
    component: Daftar,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/lupa-password",
    name: "lupa-password",
    component: LupaPassword,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/resetpassword/:token",
    name: "resetpassword",
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// router.beforeEach(to, from, next)
router.beforeEach((to, from, next) => {
  // di json.parse karena sebelumnya string dan harus diubah menjadi boolean
  const token = localStorage.getItem("token");
  // if (to.name !== "login" && !token) next({ name: "login" });
  if (to.name === "intro" && token) next({ name: "dashboard" });
  else next();
});

export default router;
