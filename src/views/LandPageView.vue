<template>
  <mdb-container fluid style="width: 90%;">
    <Navbar />
    <div id="search">
      <Search /> 
    </div>
    <div id="res">
      <Residences :allResidences="allResidences"  /> 
    </div>
    
  </mdb-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Search from "@/components/Search.vue"
import Residences from "@/components/Residences.vue"
import { mdbContainer } from 'mdbvue'

export default {
  components: {
    Navbar,
    Search,
    Residences,
    mdbContainer
  },
  data() {
    return {
      allResidences: true, //za dugmice
    }
  }
};
</script>

<style scoped>

#search {
  margin: auto;
  background-color: rgba(0, 150, 136, 0.1);
  width: 78%;
  border-radius: 8px;
}

#res {
  margin-top: 15px;
  padding: 2px;
}
</style>
