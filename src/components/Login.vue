<template>
    <div class="login-form">
        <h2>Login</h2>
        <form action="#" @submit.prevent="login">
            <div class="form-control">
                <input type="text" name="username" id="username" placeholder="username" class="login-input" v-model="username">
            </div>
            <div class="form-control">
                <input type="password" name="password" id="password" placeholder="password" class="login-input" v-model="password">
            </div>
            <div class="form-control">
                <button type="submit" class="btn-info">Login</button>
            </div>      
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            errors: [],
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retriveToken', {
                username: this.username,
                password: this.password,
            })
                .then( 
                    this.$router.push({ name: 'home' })
                )
                .catch(error => {
                    this.$router.push({ name: 'login' })
                    this.errors = Object.values(error.response.data.username)
                })
            //alert(this.username+' '+this.password);
        }
    }
}
</script>

<style scoped>
    .button{
        position: relative;
        position: center;
    }
</style>