<template>
 <mdb-navbar>
    <mdb-navbar-brand href="#">
      e-ugostiteljstvo
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item v-on:click = "home" active>Home</mdb-nav-item>
        <Dropdown />
      </mdb-navbar-nav>
      <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
      </form>
    </mdb-navbar-toggler>
  </mdb-navbar>
  <!--<b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">
      <h5>
        Welcome
        <b-badge variant="dark">e-ugostiteljstvo</b-badge>
        <Dropdown />
      </h5>
    </b-navbar-brand>
  </b-navbar>-->
</template>

<script>

import Dropdown from "./Dropdown";
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput } from 'mdbvue';
export default {
  components: {
    Dropdown,
    mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbInput
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
