<template>
    <div>
        <mdb-container>
            <mdb-row>
                <mdb-col col="4"></mdb-col>
                <mdb-col col="4">
                <mdb-card id="add_residence">
                    <mdb-card-body>
                        <form action="#" @submit.prevent="saveResidence" id="new_Residence">
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
                            <mdb-input v-if="edit" label="Type" icon="home" type="text" name="type" id="edittype" v-model="residence.type" disabled/>
                            <mdb-input v-if="edit" label="Address" icon="map-marker-alt" type="text" name="address" id="editaddress" v-model="residence.address" disabled/>
                            <mdb-input v-if="edit" label="Town" icon="city" type="text" name="town" id="edittown" v-model="residence.town" disabled/>
                            <mdb-input v-if="edit" label="Country" icon="globe-europe" type="text" name="country" id="editcountry" v-model="residence.country" disabled/>
                            <mdb-input v-if="edit" label="Enter price" icon="dollar-sign" type="text" name="price" id="price" v-model="residence.price" required/>
                            <mdb-input v-if="edit" label="Bed number" icon="bed" type="number" name="bed_number" id="bed_number" v-model="residence.bed_number" required/>
                            <mdb-input v-if="edit" icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" id="description" v-model="residence.description" required/>
                            <mdb-input v-if="!edit" label="Enter town" icon="city" type="text" name="town" id="town" v-model="town" required/>
                            <mdb-input v-if="!edit" label="Enter country" icon="globe-europe" type="text" name="country" id="country" v-model="country" required/>
                            <mdb-input v-if="!edit" label="Enter price" icon="dollar-sign" type="text" name="price" id="price" v-model="price" required/>
                            <mdb-input v-if="!edit" label="Bed number" icon="bed" type="number" name="bed_number" id="bed_number" v-model="bed_number" required/>
                            <mdb-input v-if="!edit" icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" id="description" v-model="description" required/>
                            <input v-if="!edit" type="file" id="images" multiple v-on:change="handleFileUploads">
                        </div>
                        <div id="map">
                            <p> GOOGLE </p>
                            <google-map />
                        </div>
                        <mdb-row>
                            <mdb-col xs="12" sm="6" md="4">
                                <div class="text-center">
                                    <mdb-btn  gradient="tempting-azure" type="submit" class="rounded"><mdb-icon icon="check-circle"/>Save</mdb-btn>
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
import GoogleMap from "@/components/GoogleMap.vue";

export default {
    name: "Residence",
    components: {
        mdbInput,
        mdbBtn,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbIcon,
        GoogleMap
    },
    data(){
        return {
            id: "",
            type: "",
            address: "",
            town: "",
            country: "",
            price: "",
            bed_number: "",
            description: "",
            files: []
        };
    },
    computed: {
        edit() {
            return this.$store.getters.getEdit
        },
        residence() {
            return this.$store.getters.getResidence
        },
       
    },
    methods:{
        cancel() {
            this.$emit("cancel-add")
            this.$store.commit("setResidence", null)
            this.$store.commit("setEdit", false)
            this.files = []
        },
        saveResidence(){
            if(!this.edit){
                var formData = new FormData()

                this.files.forEach(function(file) {
                    console.log(file);
                    console.log("2222222222222")
                    formData.set(file.name, file)
                })

                // console.log(formData.get("ap1.7.jpg"))
               

                this.$store.dispatch("createResidence", {
                    type: this.type,
                    address: this.address,
                    town: this.town,
                    country: this.country,
                    price: this.price,
                    bed_number: this.bed_number,
                    description: this.description,
                    images: formData
                })
                this.$emit("cancel-add")
            }else{
                this.$store.dispatch("editResidence", {
                id: this.residence.id,
                type: this.residence.type,
                address: this.residence.address,
                town: this.residence.town,
                country: this.residence.country,
                price: this.residence.price,
                bed_number: this.residence.bed_number,
                description: this.residence.description
                
            })
                this.$store.commit("setResidence", null)
                this.$emit("cancel-add")
            }
        },
        handleFileUploads() {
            var images = document.getElementById("images")
            for(var i = 0; i < images.files.length; i++){
                this.files.push(images.files[i])
            }
        }
      
    }
}
</script>

<style>
    #add_residence{
        /*margin-top: 50px;*/
        margin: auto;
        width: 500px;
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
    
    .rounded {
        height: 60px;
        width: 140px;
    }
   
</style>