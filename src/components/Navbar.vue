<template>
<div>
  <mdb-navbar color="teal lighten-5"  light id="nav">
    <mdb-navbar-brand >
      <img src="../assets/logo.png" alt="" v-on:click ="home">
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav nav right>
        <Dropdown />
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</div>
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

#nav{
  opacity: 0.7;
  height: 85px;
  z-index: 1;
}
#nav:hover{
  opacity: 1.0;
}

</style>
