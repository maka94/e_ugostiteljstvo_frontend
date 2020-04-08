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
                    <mdb-input label="Your username" icon="user" type="text" name="username" id="username" v-model="username" required/>
                    <mdb-input label="Your password" icon="lock" type="password" name="password" id="password" v-model="password" required/>
                  </div>
                  <div class="text-center">
                    <mdb-btn gradient="mean-fruit" type="submit" class="rounded">Login</mdb-btn>
                  </div>
                </form>
              </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn } from 'mdbvue';
export default {
  name: "login",
  components: {
      mdbInput,
      mdbBtn,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbCard,
      mdbCardBody
    },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retriveToken", {
          username: this.username,
          password: this.password
        })
        .then(this.$router.push({ name: "home" }))
        .catch(error => {
          this.$router.push({ name: "login" });
          this.errors = Object.values(error.response.data.username);
        });
      //alert(this.username+' '+this.password);
    }
  }
};
</script>

<style scoped>
 #login_form{
   /*margin: 15px;
   padding: 10px;*/
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
