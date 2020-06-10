import Vue from "vue";
import Vuex from "vuex";
import  {httpNetwork} from "../config/axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isPc: true,
    islogin:0,//1表示登录 0表示未登录
    product_activity_id:766,
    userInfo:{},
    userId:0,
    points:0
  },
  mutations: {
    setPc(state, value = true) {
      state.isPc = value;
    },
    setuserInfo(state,value) {
      state.userInfo = value;
    },
    setuserId(state,value) {
      state.userId = value;
    },
    setLogin(state, value = 0) {
      state.islogin = value;
    },
    setProductId(state,value){
      state.product_activity_id = value;
    },
    setPoints(state,value){
      state.points = value;
    },
  },
  actions: {
    getLogin({ state, commit }){
      console.log(state)
      const url = 'index.php?route=forum/forum2/checklogin'
      const data = {
        currenturl: window.location.href 
      }
      return httpNetwork(url,data).then(res=>{
        if(res.code===1){
          commit('setLogin',1)
          // commit('setuserInfo',JSON.parse(res.user))
          commit('setuserId',res.customer_id)
          commit('setPoints',res.points)
          console.log(state)
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
