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
  getters: {
    loggedIn(state){
      return state.token
    }
  },
  mutations: {
    retriveToken(state, token){
      state.token = token
    },
    destroyToken(state){
      console.log(state.token)
      state.token = null
    },
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
    },
    register(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          first_name: data.firstname,
          last_name: data.lastname,
          username: data.username,
          email: data.email,
          password: data.password
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          toast.error(error.response.data.username);
          reject(error)
        })
      })
    },
    destroyToken(context){
      axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
      if(context.getters.loggedIn){
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
  },
  modules: {}
})

export default store;
