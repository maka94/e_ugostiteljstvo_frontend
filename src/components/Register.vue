<template>
    <div>
        <mdb-container fluid>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <mdb-card id="register">
            <mdb-card-body>
                <form action="#" @submit="register">
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
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn } from 'mdbvue';
import toast from "@/assets/js/services/toast";
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
        register(){
            if(this.firstname && this.lastname && this.username && this.email && this.password){
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
            } else {
                if(!this.firstname) toast.error("First name is required")
                if(!this.lastname) toast.error("Last name is required")
                if(!this.username) toast.error("Username is required")
                if(!this.email) toast.error("Email is required")
                if(!this.password) toast.error("Password is required")
            }
            
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

