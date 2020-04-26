<template>
  <div>
    <h4 class="text-center">Residences</h4>
    <AddResidence @update-residences="updateR" />
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
                    <mdb-btn size="lg" v-on:click="showEditForm(residence)" gradient="tempting-azure" rounded><mdb-icon icon="edit"/></mdb-btn>
                  </mdb-col>
                  <mdb-col></mdb-col>
                  <mdb-col xs="12" sm="6" md="4" class="mr-3">
                    <mdb-btn size="lg" v-on:click="deleteResidence(residence)" gradient="young-passion" rounded><mdb-icon icon="times-circle"/></mdb-btn>
                  </mdb-col>
                </mdb-row>
					    </mdb-card-body>
            </mdb-card>
          </mdb-card-group>
        </mdb-col>
      </mdb-row>
      <mdb-row>
          <mdb-card>
            <mdb-card-body id="editForm">
              <form action="#" @submit.prevent="editResidence">
                <p class="h4 text-center mb-4">Edit residence</p>
                <div class="grey-text">
                  <mdb-input icon="home" type="text" name="type" id="edittype" v-model="type" disabled/>
                  <mdb-input icon="map-marker-alt" type="text" name="address" id="editaddress" v-model="address" disabled/>
                  <mdb-input icon="city" type="text" name="town" id="edittown" v-model="town" disabled/>
                  <mdb-input icon="globe-europe" type="text" name="country" id="editcountry" v-model="country" disabled/>
                  <mdb-input icon="dollar-sign" type="text" name="price" id="editprice" v-model="price"/>
                  <mdb-input icon="bed" type="number" name="bed_number" id="editbed_number" v-model="bed_number"/>
                  <mdb-input icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" name="description" id="editdescription" v-model="description"/>
                </div>
                <div class="text-center">
                    <mdb-btn gradient="mean-fruit" type="submit" class="rounded">Save</mdb-btn>
                </div>
                <div class="text-center">
                    <mdb-btn gradient="mean-fruit" type="button" class="rounded" v-on:click="cancelEdit">Cancel</mdb-btn>
                </div>
              </form>
            </mdb-card-body>
          </mdb-card>
      </mdb-row>
    </mdb-container>
     
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCardGroup, mdbCard, mdbView, mdbCardImage, mdbMask, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbIcon, mdbInput } from 'mdbvue';
import AddResidence from "@/components/AddResidence.vue"
export default {
  name: "residences",
  components: {
      AddResidence,
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
      mdbInput
		},
  data() {
    return {
      residences: [],
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
  mounted() {
    this.updateR();
  },
  methods: {
    deleteResidence(residence) {
      this.$store
        .dispatch("deleteResidence", {
          id: residence.id
        })
        .then(
          this.updateR()
          //this.$router.push({ name: 'residences' })
        );
    },
    showEditForm(residence) {
      document.getElementById('editForm').style.display = "block";
      document.getElementById('edittype').value = residence.type;
      document.getElementById('editaddress').value = residence.address;
      document.getElementById('edittown').value = residence.town;
      document.getElementById('editcountry').value = residence.country;
      document.getElementById('editprice').value = residence.price;
      document.getElementById('editbed_number').value = residence.bed_number;
      document.getElementById('editdescription').value = residence.description;
      this.id = residence.id
    },
    hideEditform(){
      document.getElementById('editForm').style.display = "none"
    },
    editResidence() {
      this.$store.dispatch("editResidence", {
        id: this.id,
        type: document.getElementById('edittype').value,
        address: document.getElementById('editaddress').value,
        town: document.getElementById('edittown').value,
        country: document.getElementById('editcountry').value,
        price: document.getElementById('editprice').value,
        bed_number: document.getElementById('editbed_number').value,
        description: document.getElementById('editdescription').value
      })
      .then(this.$router.push({ name: "residences" }))
      this.updateR()
      this.hideEditform()
    },
    cancelEdit() {
      document.getElementById('editForm').style.display = "none";
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
#editForm {
  display: none;

}

#residences_cards{
  margin-top: 15px;
}

h4 {
  margin-top: 40px;
  font-family: "Lucida Console", Monaco, monospace;
  font-weight: lighter;
}

</style>
