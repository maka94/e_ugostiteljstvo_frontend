import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import toast from "@/assets/js/services/toast";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:8000/";

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    residences: [],
    residence: {type: Object},
    edit: false,
    reservations: [],
    reservation: {type: Object},
    images: []
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getResidences(state) {
      return state.residences
    },
    getResidence(state) {
      return state.residence
    },
    getEdit(state) {
      return state.edit
    },
    getReservations(state) {
      return state.reservations
    },
    getReservation(state) {
      return state.reservation
    },
    getImages(state) {
      return state.images
    }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null
      location.reload()
    },
    setResidences(state, res){
      state.residences = res
    },
    setResidence(state, residence) {
      state.residence = residence
    },
    addResidence(state, residence) {
      state.residences.push(residence)
    },
    setEdit(state, edit) {
      state.edit = edit
    },
    setReservations(state, reservations) {
      state.reservations = reservations
    },
    setReservation(state, reservation) {
      state.reservation = reservation
    },
    setImages(state, images) {
      state.images = images
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
    updateProfile(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
        return new Promise((resolve, reject) => {
          axios.put("/profile", {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            email: data.email
          })
          .then(response => {
            resolve(response.data)
            console.log(response.data)
          })
          .catch(error => {
            toast.error(error.response.data.detail);
            reject(error);
          })
        })
    },
    changePassword(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
        return new Promise((resolve, reject) => {
          axios.post("/change_password", {
            old_password: data.old_password,
            new_password: data.new_password,
            confirm_new_password: data.confirm,
          })
          .then(response => {
            toast.success("Password is successfully changed!")
            resolve(response.data)
          })
          .catch(error => {
            toast.error(error.response.data.detail);
            reject(error);
          })
        })
    },
    getResidences(context) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      //console.log(context.state.token);
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .get("/residences/")
            .then(response => {
              const res = response.data
              context.commit("setResidences", res)
              
              resolve(response.data);
            })
            .catch(error => {
              toast.error(error.response.data.detail);
              reject(error);
            });
        });
      }
    },
    getAllResidences(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .get("/residences/all")
            .then(response => {
              const res = response.data
              context.commit("setResidences", res)
              context.dispatch("getResidenceImages", res)
              resolve(response.data);
            })
            .catch(error => {
              toast.error(error.response.data.detail);
              reject(error);
            });
        });
      }
    },
    getResidenceImages(context, residences){
      var img ;
      var images = [];
      residences.forEach(myFunction) 
      function myFunction(value){
        if(value.images.length > 0){
          img = value.images
          img.forEach(getImage)
        }
      }
      function getImage(value) {
        //images.push(value.image)
        axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
        return new Promise((resolve, reject) => {
          axios.get("/residences/download/"+value.image)
          .then(response => {
            images.push(response.data)
            console.log(response.data)
            resolve(response)
          })
          .catch(error => {
            toast.error(error.response)
            reject(error)
          })
        })
      }
      context.commit("setImages", images)
      console.log(context.getImages)
    },
    deleteResidence(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .delete("/residences/" + data.id + "/")
          .then(response => {
            context.dispatch("getResidences")
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
            context.dispatch("getResidences")
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
            context.dispatch("getResidences")
            resolve(response);
            toast.success("Your changes are saved!")
          })
          .catch(error => {
            toast.error(error.response.data);
            reject(error);
          });
      });
    },
    searchResidences(context, data){
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      const axiosParams = new URLSearchParams()
      axiosParams.append('date_from', data.date_from)
      axiosParams.append('date_to', data.date_to)
      axiosParams.append('country', data.country)
      axiosParams.append('town', data.town)
      axiosParams.append('address', data.address)
      axiosParams.append('price_from', data.price_from)
      axiosParams.append('price_to', data.price_to)
      axiosParams.append('type', data.type)
      axiosParams.append('bed_num', data.bed_num)

      return new Promise((resolve, reject) => {
        axios
          .get("/residences/search", {
            params: axiosParams
          })
          .then(response => {
            context.commit("setResidences", response.data)
            resolve(response.data)
          })
          .catch(error => {
            toast.error(error.response.data);
            reject(error);
          });
      });
    },
    create_reservation(context, data) {
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios.post("reservations/", {
          residence: data.id,
          date_from: data.date_from,
          date_to: data.date_to
        })
        .then(response =>{
          toast.success("Reservation successfully created!")
          resolve(response.data)
        })
        .catch(error => {
          toast.error(error.response.data);
          reject(error);
        })
      })
    },
    getReservations(context) {
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/reservations/")
          .then(response => {
            context.commit("setReservations", response.data)
            resolve(response.data);
          })
          .catch(error => {
            toast.error(error.response.data.detail);
            reject(error);
          });
      })
    },
    cancelReservation(context, data) {
      axios.defaults.headers.common["Authorization"] = "Token " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .delete("/reservations/"+data.id)
          .then(response => {
            context.dispatch("getReservations")
            toast.success("Your reservation is successfully cancelled!")
            resolve(response.data);
          })
          .catch(error => {
            toast.error(error.response.data.detail);
            reject(error);
          });
      })
    }
  },
  modules: {}
});

export default store;
