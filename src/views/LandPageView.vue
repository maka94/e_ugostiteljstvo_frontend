<template>
  <div fluid>
    <div class="bg" overlay="black-strong">
    <div class="overlay"></div>
    </div>
    <Navbar />
    <div id="search">
      <Search /> 
    </div>
    <div id="res">
      <Residences :allResidences="allResidences"  /> 
    </div>
    
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Search from "@/components/Search.vue"
import Residences from "@/components/Residences.vue"
export default {
  components: {
    Navbar,
    Search,
    Residences,
  },
  data() {
    return {
      allResidences: true, //za dugmice
    }
  }
};
</script>

<style scoped>
.bg {
    background-image: url("../assets/land_page_background.jpg");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-attachment: fixed;
  }

  .bg .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: .2;
    background: #8585ad;
}

#search {
  margin-top: 15px;
}

#res {
  margin-top: 15px;
  padding: 2px;
}
</style>
