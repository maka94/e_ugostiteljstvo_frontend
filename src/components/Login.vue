<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                </div>
                <div class="col-lg-4">
                    <h2>Login</h2>
                    <form action="#" @submit.prevent="login">
                        <input type="text" name="username" id="username" placeholder="username" class="login-input" v-model="username">
                        <p></p>
                        <input type="password" name="password" id="password" placeholder="password" class="login-input" v-model="password">
                        <p></p>
                        <button type="submit" class="btn-info">Login</button>
                    </form>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
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