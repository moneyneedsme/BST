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
  {
    path: "/postComments",
    name: "postComments",
    component: () => import("../views/postComments.vue")
  },
  {
    path: "/myDarftsView",
    name: "myDarftsView",
    component: () => import("../components/myDarftsView.vue")
  },
  {
    path: "/myArticlesView",
    name: "myArticlesView",
    component: () => import("../components/myArticlesView.vue")
  },
  {
    path: "*",
    redirect:"/"
  },
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(to.query.product_activity_id) store.commit('setProductId',to.query.product_activity_id)
  if(to.path==='/'){
    next()
    return
  } 
  store.dispatch('getLogin').then(()=>{
    next()
  })
});
export default router;
