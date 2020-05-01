import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/js/rem.js";
import "./assets/css/public.css";
import "./assets/iconfont/iconfont.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import  config from "./config";
Vue.prototype.imgUrl= config.imgUrl
Vue.use(ElementUI);
Vue.prototype.vueLoading= {
  node:'',
  show(){
    this.node = ElementUI.Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  hide(){
    this.node.close()
  }
}
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
