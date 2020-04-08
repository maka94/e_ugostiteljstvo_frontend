<template>
    <div>
        <mdb-container fluid>
            <mdb-row>
                <mdb-col col="4"></mdb-col>
                <mdb-col col="4">
                <mdb-card id="add_residence">
                    <mdb-card-body>
                        <form action="#" @submit.prevent="addResidence" id="new_Residence">
                        <p class="h4 text-center mb-4">Add new residence</p>
                        <div class="grey-text">
                            <mdb-input label="Enter type" icon="home" type="text" name="type" id="type" v-model="type" required/>
                            <mdb-input label="Enter address" icon="map-marker-alt" type="text" name="address" id="address" v-model="address" required/>
                            <mdb-input label="Enter town" icon="city" type="text" name="town" id="town" v-model="town" required/>
                            <mdb-input label="Enter country" icon="globe-europe" type="text" name="country" id="country" v-model="country" required/>
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
                    <mdb-btn gradient="mean-fruit" class="rounded" id="add_new" v-on:click="showAddResidence"><mdb-icon icon="plus" class="mr-1" />Add new</mdb-btn>
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
    
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbIcon } from 'mdbvue';
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
        mdbIcon
    },
    data(){
        return {
            type: "",
            address: "",
            town: "",
            country: "",
            price: "",
            bed_number: 0,
            description: ""
        };
    },
    methods:{
        cancel() {
            document.getElementById("add_residence").style.display = "none";
        },
        addResidence(){
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
            
        },
        showAddResidence(){
            document.getElementById('add_residence').style.display = "block";
        },
    }
}
</script>

<style>
    #add_residence{
        display: none;
    }
</style>