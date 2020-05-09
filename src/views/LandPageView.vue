<template>
  <div fluid>
    <div class="bg" overlay="black-strong">
    <div class="overlay"></div>
    </div>
    <Navbar />
    <div id="search">
      <Search @filter-residences="filter"/>
    </div>
    <div id="res">
      <AllResidences :residences="residences" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Search from "@/components/Search.vue"
import AllResidences from "@/components/AllResidences.vue"

export default {
  components: {
    Navbar,
    Search,
    AllResidences
  },
  data() {
    return {
      residences: []
    }
  },
  mounted() {
    this.$store
      .dispatch("getAllResidences")
      .then(response => (this.residences = response));
  },
  methods: {
    filter: function(residences) {
      this.residences = residences
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
