<template>
    <div>
        <mdb-container>
            <mdb-row>
                <mdb-card id="add_residence">
                    <mdb-card-body>
                        <form action="#" @submit.prevent="saveResidence" id="new_Residence">
                            <p class="h4 text-center mb-4" id="add_title" v-if="!edit">Add new residence</p>
                            <p class="h4 text-center mb-4" id="add_title" v-if="edit">Edit residence</p>
                            <div class="grey-text">
                                <mdb-row>
                                    <div id="map" v-if="!edit">
                                        <google-map @added="onAddressAdd" />
                                    </div>
                                </mdb-row>
                                <br/>
                                <mdb-row>
                                    <mdb-col>
                                        <div class="row" v-if="!edit" style="width: 90%;">
                                            <div class="col-md-4">
                                                <mdb-icon icon="home" style="width: 70;"/>Choose type:
                                            </div>
                                            <div class="col-md-8">
                                                <select class="browser-default custom-select" name="type" id="type" v-model="type" required>
                                                    <option value="Room">Room</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="House">House</option>
                                                </select>
                                            </div>
                                        </div>
                                    </mdb-col>
                                    <mdb-col>
                                        <input v-if="!edit" type="file" id="images" multiple v-on:change="handleFileUploads">
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Type" icon="home" type="text" name="type" id="edittype" v-model="residence.type" disabled/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Address" icon="map-marker-alt" type="text" name="address" id="editaddress" v-model="residence.address" disabled/>
                                    </mdb-col>  
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Town" icon="city" type="text" name="town" id="edittown" v-model="residence.town" disabled/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Country" icon="globe-europe" type="text" name="country" id="editcountry" v-model="residence.country" disabled/>
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Enter price" icon="dollar-sign" type="text" name="price" id="price" v-model="residence.price" required/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="edit" label="Bed number" icon="bed" type="number" name="bed_number" id="bed_number" v-model="residence.bed_number" required/>
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-input style="width: 100%;" v-if="edit" icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" id="description" v-model="residence.description" required/>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" label="Enter address" icon="map-marker-alt" type="text" name="address" id="address" v-model="address" disabled/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" label="Enter town" icon="city" type="text" name="town" id="town" v-model="town" disabled/>
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" label="Enter Country" icon="globe-europe" type="text" name="country" id="country" v-model="country" disabled/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" label="Enter price" icon="dollar-sign" type="text" name="price" id="price" v-model="price" required/>
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" label="Bed number" icon="bed" type="number" name="bed_number" id="bed_number" v-model="bed_number" required/>
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-input v-if="!edit" icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" id="description" v-model="description" required/>
                                    </mdb-col>
                                </mdb-row>
                                <mdb-row>
                                    <mdb-col>
                                        
                                    </mdb-col>
                                    <mdb-col></mdb-col>
                                </mdb-row>
                                
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
                            </div>
                        </form>
                    </mdb-card-body>
                </mdb-card>
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
            lat: "",
            lon: "",
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
        onAddressAdd(value) {
            console.log(value.address)
            this.lat = value.lat
            this.lon = value.lng
            this.town = value.town
            this.country = value.country
            this.address = value.address
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
                    lat: this.lat,
                    lon: this.lon,
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
        width: 1000px;
        z-index: 1;
        border-radius: 10%;
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

    #map{
        margin: auto;
        width: 500px;
        background-color: rgba(76, 175, 80, 0.2);
        padding: 10px;
        border-radius: 5%;
    }
   
</style>