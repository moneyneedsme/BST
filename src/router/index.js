import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    store.commit("setPc", false);
  }
  next();
});
export default router;
