<template>
    <div>
        <mdb-container>
            <mdb-row>
                <mdb-col col="4"></mdb-col>
                <mdb-col col="4">
                <mdb-card id="add_residence">
                    <mdb-card-body>
                        <form action="#" @submit.prevent="addResidence" id="new_Residence">
                        <p class="h4 text-center mb-4" id="add_title">Add new residence</p>
                        <div class="grey-text">
                            <div class="row" v-if="!edit">
                                <div class="col-md-4">
                                    <mdb-icon icon="home" />Choose type:
                                </div>
                                <div class="col-md-8">
                                    <select class="browser-default custom-select" name="type" id="type" v-model="type" required>
                                        <option value="Room">Room</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                    </select>
                                </div>
                            </div>
                            <mdb-input v-if="edit" icon="home" type="text" name="type" id="edittype" v-model="type" disabled/>
                            <mdb-input v-if="edit" icon="map-marker-alt" type="text" name="address" id="editaddress" v-model="address" disabled/>
                            <mdb-input v-if="edit" icon="city" type="text" name="town" id="edittown" v-model="town" disabled/>
                            <mdb-input v-if="edit" icon="globe-europe" type="text" name="country" id="editcountry" v-model="country" disabled/>
                            <mdb-input v-if="!edit" label="Enter address" icon="map-marker-alt" type="text" name="address" id="address" v-model="address" required/>
                            <mdb-input v-if="!edit" label="Enter town" icon="city" type="text" name="town" id="town" v-model="town" required/>
                            <mdb-input v-if="!edit" label="Enter country" icon="globe-europe" type="text" name="country" id="country" v-model="country" required/>
                            <mdb-input label="Enter price" icon="dollar-sign" type="text" name="price" id="price" v-model="price" required/>
                            <mdb-input label="Bed number" icon="bed" type="number" name="bed_number" id="bed_number" v-model="bed_number" required/>
                            <mdb-input icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" id="description" v-model="description" required/>
                        </div>
                        <mdb-row>
                            <mdb-col xs="12" sm="6" md="4">
                                <div class="text-center">
                                    <mdb-btn gradient="tempting-azure" type="submit" class="rounded"><mdb-icon icon="check-circle"/>Save</mdb-btn>
                                </div>
                            </mdb-col>
                            <mdb-col xs="12" sm="6" md="4"></mdb-col>
                            <mdb-col xs="12" sm="6" md="4">
                                <div class="text-center">
                                    <mdb-btn gradient="young-passion" type="button" class="rounded" v-on:click="cancel"><mdb-icon icon="times-circle"/>Cancel</mdb-btn>
                                </div>
                            </mdb-col>
                        </mdb-row>
                        </form>
                    </mdb-card-body>
                </mdb-card>
                </mdb-col>
                <mdb-col col="4">
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
    
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';
import {eventBus} from "../main";
export default {
    name: "AddResidence",
    components: {
        mdbInput,
        mdbBtn,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbIcon,
    },
    data(){
        return {
            id: "",
            type: "",
            address: "",
            town: "",
            country: "",
            price: "",
            bed_number: 0,
            description: "",
            edit: false
        };
    },
    created() {
        eventBus.$on("show-edit", (residence) => {
            this.edit = true
            this.type = residence.type
            this.address = residence.address
            this.town = residence.town
            this.country = residence.country
            this.price = residence.price
            this.bed_number = residence.bed_number
            this.description = residence.description
            this.id = residence.id
            console.log(this.id)
        })
    },
    methods:{
        cancel() {
            this.$emit("cancel-add")
            this.id = ""
            this.type = ""
            this.address = ""
            this.town = ""
            this.country = ""
            this.price = ""
            this.bed_number = ""
            this.description = ""
            this.edit = false
        },
        addResidence(){
            if(!this.edit){
            this.$store.dispatch("createResidence", {
                type: this.type,
                address: this.address,
                town: this.town,
                country: this.country,
                price: this.price,
                bed_number: this.bed_number,
                description: this.description
            })
            .then(this.$router.push({ name: "residences" }))
            eventBus.$emit("update-residences", true)
            this.$emit("hide-add")
            }else{
                this.$store.dispatch("editResidence", {
                id: this.id,
                type: this.type,
                address: this.address,
                town: this.town,
                country: this.country,
                price: this.price,
                bed_number: this.bed_number,
                description: this.description
                
            })
            .then(this.$router.push({ name: "residences" }))
                eventBus.$emit("update-residences", true)
                this.$emit("hide-add")
                document.getElementById('price').value = "";
                document.getElementById('bed_number').value = "";
                document.getElementById('description').value = "";
                //this.id = ""
                this.edit = false
            }
        },
      
    }
}
</script>

<style>
    #add_residence{

        margin-top: 50px;
        z-index: 1;
    }
    #type{
        width: 103%;
        margin-right: 80px;
    }

    #add_new{
        margin-top: 20px;
        margin-left: 80%;
        width: 50%;
    }
    
   
</style>