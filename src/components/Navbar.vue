<template>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">
      <h5>
        Welcome
        <b-badge variant="dark">e-ugostiteljstvo</b-badge>
        <button name="logout" id="logout" v-on:click="logout">Logout</button>
      </h5>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$store.dispatch('destroyToken')
        .then(
          this.$router.push({ name: 'login' })
        )
    }
  }
}
</script>