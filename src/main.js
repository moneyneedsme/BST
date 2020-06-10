import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/js/rem.js"
import "./assets/css/public.css"
import "./assets/iconfont/iconfont.css"
import "./assets/css/animate.css"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import  config from "./config"
import axios from 'axios'
import FB from './assets/js/sdk'
import  {httpNetwork} from "./config/axios";
Vue.prototype.imgUrl= config.imgUrl
Vue.prototype.getLogin= function(){
  const url = 'index.php?route=forum/forum2/checklogin'
  const data = {
    currenturl: window.location.href 
  }
  return httpNetwork(url,data).catch(err=>{
    window.location.href="https://www.bestekdirect.com/login"
  })
}
Vue.use(ElementUI);
Vue.use(FB);
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
Vue.prototype.$axios = axios
Vue.prototype.$api= config.baseUrl
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
