<template>
 <mdb-navbar dark color="primary" style="margin-bottom: -60px; z-index: 1" transparent>
    <mdb-navbar-brand >
      <img src="../assets/logo.png" alt="" v-on:click ="home">
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <Dropdown />
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>

import Dropdown from "./Dropdown";
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav } from 'mdbvue';
export default {
  components: {
    Dropdown,
    mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
  },
  methods:{
    home(){
      this.$router.push({ name: "home" })
    }
  }
};
</script>

<style scoped>

</style>
