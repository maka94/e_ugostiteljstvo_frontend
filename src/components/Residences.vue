<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-col xs="12" md="4" v-for="residence in residences" :key="residence.id">
          <mdb-card-group deck id="residences_cards">
            <mdb-card>
              <mdb-view hover>
						    <a href="#!">
							    <mdb-card-image class="image" :src="`http://localhost:8000/residences/download/${residence.images[0].image}`" alt="Card image"></mdb-card-image>
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
      </mdb-row>
    </mdb-container>
     
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCardGroup, mdbCard, mdbView, mdbCardImage, mdbMask, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbIcon, /*mdbInput*/ } from 'mdbvue';
//import {eventBus} from "../main";
export default {
  name: "residences",
  components: {
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
    };
  },
  created() {
    if(this.allResidences) {
      this.$store
      .dispatch("getAllResidences");
    } else {
      this.$store
      .dispatch("getResidences")
    }
  },
  computed: {
    residences() {
      return this.$store.getters.getResidences
    }
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
  },
  
  methods: {
    deleteResidence(residence) {
      this.$store
      .dispatch("deleteResidence", residence)
    },
    showEditForm(residence) {
      console.log("edit klik")
      console.log(residence.type)
      this.$store.commit("setResidence", residence)
      this.$store.commit("setEdit", true)
      //eventBus.$emit("show-edit", residence)
      this.$emit("show-form")
    },
    view(residence){
      this.$store.commit("setResidence", residence)
      this.$router.push({ path: "/view_residence" })
    },
  },
  
};
</script>

<style scoped>

h4 {
  margin-top: 40px;
}

#residences_cards {
    padding: 10px;
}

.image {
  height: 180px;
}

</style>
