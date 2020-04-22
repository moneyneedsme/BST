import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/myCenter",
    name: "myCenter",
    component: () => import("../views/myCenter.vue"),
    children:[
      {
        path: "/",
        redirect:'/myReviews'
      },
      {
        path: "/myReviews",
        name: "myReviews",
        component: () => import("../components/myReviews.vue")
      },
      {
        path: "/myArticles",
        name: "myArticles",
        component: () => import("../components/myArticles.vue")
      },
      {
        path: "/changePassword",
        name: "changePassword",
        component: () => import("../components/changePassword.vue")
      },
      {
        path: "/myProfile",
        name: "myProfile",
        component: () => import("../components/myProfile.vue")
      }
    ]
  },
  {
    path: "/apply",
    name: "apply",
    component: () => import("../views/apply.vue")
  },
  {
    path: "/publishArticle",
    name: "publishArticle",
    component: () => import("../views/publishArticle.vue")
  },
];
const router = new VueRouter({
  mode: "hash",
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
