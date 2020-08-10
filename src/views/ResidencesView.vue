<template>
  <mdb-container fluid style="width: 90%;">
      <Navbar />
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <br>
          <mdb-btn size="lg" id="add_new" v-on:click="showAddResidence"><mdb-icon icon="plus"  />Add new</mdb-btn>
        </mdb-col>
      </mdb-row>
      <br>
      <hr style="width: 50%;">
      <Residence v-show="visible"  @cancel-add="cancel" class="animated zoomIn"/> 
      <Residences :myResidences="myResidences"  @show-form="showAddResidence" style="padding: 20px"/> <!-- :residences="residences" -->
  </mdb-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Residence from "@/components/Residence.vue";
import Residences from "@/components/Residences.vue"
import { mdbContainer, mdbIcon, mdbBtn, mdbRow, mdbCol } from 'mdbvue'
export default {
  components: {
    mdbContainer,
    Navbar,
    Residence,
    Residences,
    mdbIcon,
    mdbBtn,
    mdbRow,
    mdbCol
  },
  data() {
    return {
      myResidences: true, //za dugmice 
      visible: false,
      //residences: []
    }
  },
  methods: {
    showAddResidence(){
      //this.$store.commit("setResidence", null)
      this.visible = true
    },
    cancel(){
      this.visible = false
    },
  }
};
</script>

<style scoped>
   #add_new{
     margin: auto;
     border-radius: 100px;
     background-color: #4db6ac;
  }
</style>
