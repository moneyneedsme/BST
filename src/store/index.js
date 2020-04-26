import Vue from "vue";
import Vuex from "vuex";
import  {httpNetwork} from "../config/axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isPc: true,
    islogin:0,//1表示登录 0表示未登录
  },
  mutations: {
    setState(state,data){
      state = data;
    },
    setPc(state, value = true) {
      state.isPc = value;
    },
    setLogin(state, value = 0) {
      state.islogin = value;
    }
  },
  actions: {
    getLogin({ state, commit }){
      const url = 'index.php?route=forum/forum2/checklogin'
      httpNetwork(url,null,'get').then(res=>{
        if(res.code===1){
          commit('setLogin',1)
        }
      }).catch(err=>{
        commit('setLogin',1)
        if(err.code===0){
        //  window.location.href="https://www.bestekdirect.com/login"
        }
      })
    }
  },
  modules: {}
});
