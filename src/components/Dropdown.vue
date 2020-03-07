<template>
    <b-dropdown id="dropdown" class="m-md-2">
        <b-dropdown-item-btn name="residences" id="residences" v-on:click="showResidences">My Residences</b-dropdown-item-btn>
        <b-dropdown-item-btn name="logout" id="logout" v-on:click="logout">Logout</b-dropdown-item-btn>
    </b-dropdown>
</template>

<script>
export default {
    name: 'dropdown',
    methods: {
    logout(){
      this.$store.dispatch('destroyToken')
        .then(
          this.$router.push({ name: 'login' })
        )
    },
    showResidences(){
        this.$router.push({ name: 'residences' })
    }
  }
}
</script>