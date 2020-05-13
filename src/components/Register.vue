<template>
    <div>
        <mdb-container fluid>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <mdb-card id="register">
            <mdb-card-body>
                <form action="#" @submit="validate">
                  <p class="h4 text-center mb-4">Register</p>
                  <div class="grey-text">
                      <mdb-input label="Enter first name" icon="user" type="text" name="firstname" id="firstname" v-model="firstname"/>
                      <mdb-input label="Enter last name" icon="user" type="text" name="lastname" id="lastname" v-model="lastname"/>
                    <mdb-input label="Enter username" icon="user" type="text" name="username" id="username" v-model="username"/>
                    <mdb-input label="Enter your e-mail" icon="at" type="email" name="email" id="email" v-model="email"/>
                    <mdb-input label="Create password" icon="lock" type="password" name="password" id="password" v-model="password" />
                  </div>
                  <div class="text-center">
                    <mdb-btn gradient="mean-fruit" type="submit" class="rounded">Create account</mdb-btn>
                  </div>
                </form>
              </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
       <!-- <form action="#" @submit="validate">
            <h2 class="login-heading">Register</h2>

              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>

            
            <p>
                <label for="firstname">First name</label>
                <input id="firstname" v-model="firstname" type="text" name="firstname">
            </p>
            <p>
                <label for="lastname">Last name</label>
                <input id="lastname" v-model="lastname" type="text" name="lastname">
            </p>
            <p>
                <label for="username">Username</label>
                <input id="username" v-model="username" type="text" name="username">
            </p>
            <p>
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" name="email">
            </p>
            <p>
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" name="password">
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>-->
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn } from 'mdbvue';
export default {
    components: {
        mdbContainer,
        mdbRow, 
        mdbCol,
        mdbCard, 
        mdbCardBody, 
        mdbInput, 
        mdbBtn,
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            errors: [],
        }
    },
    methods:{
        validate: function(e){
            if(this.firstname && this.lastname && this.username && this.email && this.password){
                this.register();
            }
            this.errors = [];

            if(!this.firstname){
                this.errors.push('First name is required!');
            }
            if(!this.lastname){
                this.errors.push('Last name is required!');
            }
            if(!this.username){
                this.errors.push('Usrename is required!');
            }
            if(!this.email){
                this.errors.push('Email is required!');
            }
            if(!this.password){
                this.errors.push('Password is required!')
            }
            e.preventDefault();
        },
        register(){
            this.$store.dispatch('register', {
                firstname: this.firstname,
                lastname: this.lastname,
                username: this.username,
                email: this.email,
                password: this.password,
            })
            .then(
               this.$router.push({name: 'login'})
                //this.successMessage = "Registered successfully!"
            )
            .catch(error => {
                this.$router.push({ name: 'register' })
                this.errors = Object.values(error.response.data.username)
            })
        }
    }
}
</script>

<style scoped>
    .card{
        padding: 5%;
        margin: 55px;
        width: 100%;
}
</style>

