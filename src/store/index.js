import Vue from "vue";
import Vuex from "vuex";
import  {httpNetwork} from "../config/axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isPc: true,
    islogin:0,//1表示登录 0表示未登录
    product_activity_id:766,
    userInfo:{}
  },
  mutations: {
    setPc(state, value = true) {
      state.isPc = value;
    },
    setuserInfo(state,value) {
      state.userInfo = value;
    },
    setLogin(state, value = 0) {
      state.islogin = value;
    },
    setProductId(state,value){
      state.product_activity_id = value;
    },
  },
  actions: {
    getLogin({ state, commit }){
      const url = 'index.php?route=forum/forum2/checklogin'
      const data = {
        currenturl: 'https://www.bestekdirect.com/reviews/index.html'
      }
      return httpNetwork(url,data).then(res=>{
        if(res.code===1){
          commit('setLogin',1)
          commit('userInfo',JSON.parse(res.user))
        }
      }).catch(err=>{
        if(err.code===0){
          window.location.href="https://www.bestekdirect.com/login"
        }
      })
    }
  },
  modules: {}
});
