<template>
<mdb-dropdown btn-group dropleft style="margin-left: 200px; z-index: 999;">
    <mdb-dropdown-toggle id="dropdown" color="default" slot="toggle"><mdb-icon icon="user"/></mdb-dropdown-toggle>
    <mdb-dropdown-menu style="z-index: 999; background-color: #e0f2f1 ;">
      <mdb-dropdown-item name="residences" id="residences" v-on:click="showResidences">My Residences</mdb-dropdown-item>
      <mdb-dropdown-item name="reservations" id="reservations" v-on:click="showReservations">My Reservations</mdb-dropdown-item>
      <mdb-dropdown-item name="myprofile" id="myprofile" v-on:click="showProfile">My Profile</mdb-dropdown-item>
      <div class="dropdown-divider"></div>
      <mdb-dropdown-item name="logout" id="logout" v-on:click="logout">Log out</mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
export default {
  name: "dropdown",
  components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon
    },
  methods: {
    logout() {
      this.$store
        .dispatch("destroyToken")
        .then(this.$router.push({ name: "login" }));
    },
    showResidences() {
      this.$router.push({ name: "residences" });
    },
    showReservations(){
      this.$router.push({ name: "reservations" })
    },
    showProfile(){
      this.$router.push({ name: "profile" });
    }
  }
};
</script>

<style scoped>
#dropdown:hover{
  opacity: 1.0;
}

#dropdown {
  
}
</style>
