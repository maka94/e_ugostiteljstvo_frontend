import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import toast from "@/assets/js/services/toast";
//import VueAxios from 'vue-axios';

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:8000/";

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null
      location.reload()
    }
  },
  actions: {
    retriveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.token;
            localStorage.setItem("access_token", token);
            context.commit("retriveToken", token);
            resolve(response);
            //console.log(response)
          })
          .catch(error => {
            toast.error(error.response.data.error);
            reject(error);
          });
      });
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/register", {
            first_name: data.firstname,
            last_name: data.lastname,
            username: data.username,
            email: data.email,
            password: data.password
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            toast.error(error.response.data.username);
            reject(error);
          });
      });
    },
    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/logout")
            .then(response => {
              context.commit("destroyToken");
              localStorage.removeItem("access_token");
              console.log("destroy token commited")
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },
    getProfile(context){
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      console.log(context.state.token);
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .get("/profile")
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              toast.error(error.response.data.detail);
              reject(error);
            });
        });
      }
    },
    getResidences(context) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      console.log(context.state.token);
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .get("/residences/")
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              toast.error(error.response.data.detail);
              reject(error);
            });
        });
      }
    },
    deleteResidence(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .delete("/residences/" + data.id + "/")
          .then(response => {
            resolve(response.data);
            toast.success("Residence deleted!");
          })
          .catch(error => {
            toast.error(error.response.data.detail);
            reject(error);
          });
      });
    },
    createResidence(context, data){
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .post("/residences/", {
            type: data.type,
            address: data.address,
            town: data.town,
            country: data.country,
            price: data.price,
            bed_number: data.bed_number,
            description: data.description
          })
          .then(response => {
            resolve(response);
            toast.success("Residence successfully saved!")
          })
          .catch(error => {
            reject(error);
            toast.error("Error while creating residence!")
          });
      });
    },
    editResidence(context, data){
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .put("/residences/" + data.id + "/", {
            type: data.type,
            address: data.address,
            town: data.town,
            country: data.country,
            price: data.price,
            bed_number: data.bed_number,
            description: data.description
          })
          .then(response => {
            resolve(response);
            toast.success("Your changes are saved!")
          })
          .catch(error => {
            toast.error(error.response.data);
            reject(error);
          });
      });
    },
  },
  modules: {}
});

export default store;
