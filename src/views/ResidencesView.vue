<template>
  <mdb-container>
      <Navbar />
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <h4 class="text-center" style="margin-top: 10px">My Residences</h4>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <mdb-btn size="lg" gradient="mean-fruit" class="rounded" id="add_new" v-on:click="showAddResidence"><mdb-icon icon="plus"  />Add new</mdb-btn>
        </mdb-col>
      </mdb-row>
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
  }
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
</style>
