<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-col xs="12" sm="6" md="4" v-for="residence in residences" :key="residence.id">
          
          <mdb-card-group deck id="residences_cards">
            <mdb-card>
              <mdb-view hover>
						    <a href="#!">
							    <mdb-card-image src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap"></mdb-card-image>
							    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						    </a>
					    </mdb-view>
              <mdb-card-body>
                <mdb-card-title> {{residence.type}} </mdb-card-title>
                <mdb-card-text> {{residence.town}}, {{residence.country}} </mdb-card-text>
                <mdb-row>
                  <mdb-col xs="12" sm="6" md="4">
                    <mdb-btn v-if="myResidences" size="lg" v-on:click="showEditForm(residence)" gradient="tempting-azure" rounded><mdb-icon icon="edit"/></mdb-btn>
                  </mdb-col>
                  <mdb-col>
                    <mdb-btn v-if="allResidences" size="lg" v-on:click="view(residence)" gradient="tempting-azure" rounded><mdb-icon icon="eye"/></mdb-btn>
                  </mdb-col>
                  <mdb-col xs="12" sm="6" md="4" class="mr-3">
                    <mdb-btn v-if="myResidences" size="lg" v-on:click="deleteResidence(residence)" gradient="young-passion" rounded><mdb-icon icon="times-circle"/></mdb-btn>
                  </mdb-col>
                </mdb-row>
					    </mdb-card-body>
            </mdb-card>
          </mdb-card-group>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <!--<EditResidence />-->
      </mdb-row>
    </mdb-container>
     
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCardGroup, mdbCard, mdbView, mdbCardImage, mdbMask, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbIcon, /*mdbInput*/ } from 'mdbvue';
import {eventBus} from "../main";
//import EditResidence from "@/components/EditResidence.vue"
export default {
  name: "residences",
  components: {
      //EditResidence,
      mdbContainer,
      mdbRow,
      mdbCol,
      mdbCardGroup,
      mdbCard,
      mdbView,
      mdbCardImage,
      mdbMask,
      mdbCardBody, 
      mdbCardTitle, 
      mdbCardText,
      mdbBtn,
      mdbIcon,
		},
  data() {
    return {
      id: "",
      type: "",
      address: "",
      town: "",
      country: "",
      price: "",
      bed_number: "",
      description: "",
      residence: null,
      visible: false,
      update: false
    };
  },
  created() {
    eventBus.$on("update-residences", (update) => {
    this.update = update
    this.updateR()
    });
  },
  props: {
    myResidences: {
      type: Boolean,
      default: false
    },
    allResidences: {
      type: Boolean,
      default: false
    },
    residences: []
  },
  
  methods: {
    deleteResidence(residence) {
      this.$store
        .dispatch("deleteResidence", {
          id: residence.id
        })
        .then(
          this.updateR()
        );
    },
    showEditForm(residence) {
      eventBus.$emit("show-edit", residence)
      this.$emit("show-form")
    },
    updateR(){
      this.$store
      .dispatch("getResidences")
      .then(response => (this.residences = response));
    }
  },
  
};
</script>

<style scoped>

h4 {
  margin-top: 40px;
  font-family: "Lucida Console", Monaco, monospace;
  font-weight: lighter;
}

</style>
