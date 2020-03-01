<template>
    <div>
        <form action="#" @submit="validate">
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
        </form>
    </div>
</template>

<script>
export default {
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
    .form-group {
        display: flex;
        align-items: flex-start;
        position: absolute;
        width: 100%;
        top: 40px;
        left: 40%;
        z-index: 1;  
    }

    .login-heading{
        text-align: center;
        
    }

    .form-item{
        position: center;
        justify-content: center;
    }
</style>

