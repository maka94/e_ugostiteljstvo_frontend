<template>
  <div class="bg" overlay = "black-strong">
    <div class="overlay"></div>
    <mdb-container fluid>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <mdb-card id="login">
            <mdb-card-body>
                <form action="#" @submit.prevent="login" id="login_form">
                  <p class="h4 text-center mb-4">Log in</p>
                  <div class="grey-text">
                    <mdb-input label="Your username" icon="user" type="text" name="username" id="username" v-model="username"/>
                    <mdb-input label="Your password" icon="lock" type="password" name="password" id="password" v-model="password" />
                  </div>
                  <div class="text-center">
                    <mdb-btn gradient="mean-fruit" type="submit" class="rounded">Login</mdb-btn>
                  </div>
                </form>
              </mdb-card-body>
              <mdb-card-footer style="height: 20%">
                <div class="text-center" style="height: 40px; width: 200px; margin-left: 90px; margin-bottom: 15px">
                  <p style="font-size: 12px; margin-top: 5px">Don't have an account? </p>
                  <a href="" v-on:click="register" style="font-size: 14px;">Register</a>
                </div>
              </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbCardFooter } from 'mdbvue';
import toast from "@/assets/js/services/toast";
export default {
  name: "login",
  components: {
      mdbInput,
      mdbBtn,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody,
      mdbCardFooter
    },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if(this.username && this.password){
        this.$store
        .dispatch("retriveToken", {
          username: this.username,
          password: this.password
        })
        .then(this.$router.push({ name: "home" }))
        .catch(error => {
          this.$router.push({ name: "login" });
          throw new Error(`Problem handling something: ${error}.`);
        });
      } else {
        if(!this.username) toast.error("Username is required!")
        if(!this.password) toast.error("Password is required.")
      }
    },
    register(){
      this.$router.push({ name: "register" })
    }
  }
};
</script>

<style scoped>
 #login_form{
   width: 100%;
   position: relative;
 }

.card{
  padding: 5%;
  margin: 55px;
  width: 100%;
}

body, html{
  height: 100%;
}

.bg {
    background-image: url("../assets/login-background.jpg");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-attachment: fixed;
  }

  .bg .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: .2;
    background: #8585ad;
}
</style>
