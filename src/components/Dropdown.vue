<template>
<mdb-dropdown>
    <mdb-dropdown-toggle slot="toggle" color="primary">Menu</mdb-dropdown-toggle>
    <mdb-dropdown-menu>
      <mdb-dropdown-item name="residences" id="residences" v-on:click="showResidences">My Residences</mdb-dropdown-item>
      <div class="dropdown-divider"></div>
      <mdb-dropdown-item name="logout" id="logout" v-on:click="logout">Log out</mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
  <!--<b-dropdown id="dropdown" class="m-md-2">
    <b-dropdown-item-btn
      name="residences"
      id="residences"
      v-on:click="showResidences"
      >My Residences</b-dropdown-item-btn
    >
    <b-dropdown-item-btn name="logout" id="logout" v-on:click="logout"
      >Logout</b-dropdown-item-btn
    >
  </b-dropdown>-->
</template>

<script>
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue';
export default {
  name: "dropdown",
  components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle
    },
  methods: {
    logout() {
      this.$store
        .dispatch("destroyToken")
        .then(this.$router.push({ name: "login" }));
    },
    showResidences() {
      this.$router.push({ name: "residences" });
    }
  }
};
</script>
