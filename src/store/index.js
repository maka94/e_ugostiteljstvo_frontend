import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import toast from "@/assets/js/services/toast";
//import VueAxios from 'vue-axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost:8000/'

const store = new Vuex.Store({

  state: {
   token: localStorage.getItem('token') || null,
  },
  mutations: {
    retriveToken(state, token){
      state.token = token
    }
  },
  actions: {
    retriveToken(context, credentials){
      
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.token
          localStorage.setItem('token', token)
          context.commit('retriveToken', token)
          resolve(response)
          //console.log(response)
        })
        .catch(error => {
          toast.error(error.response.data.error);
          reject(error)
        })
      })
    }
  },
  modules: {}
})

export default store;
