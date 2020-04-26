<template>
    <div>
        <div class="container">
            <div class="row" id="search">

                <div class="col-md-1">
                    
                    
                </div>
                <div class="col-md-12" id="filters">
                    <mdb-container fluid style="width: 120%">
                        <mdb-row>
                            <mdb-col col="2">
                                <mdb-input label="Date from" icon="calendar" type="date" v-model="date_from" required></mdb-input>
                                <mdb-input label="Date to" icon="calendar" type="date" v-model="date_to" required></mdb-input>
                                 
                            </mdb-col>
                            <mdb-col col="2">
                                <mdb-input label="Country" icon="globe-europe" type="text" v-model="country" required></mdb-input>
                                <mdb-input label="Town" icon="city" type="text" v-model="town" required></mdb-input>
                                
                            </mdb-col>
                            <mdb-col col="2">
                                <mdb-input label="Type" icon="home" type="text" v-model="type"></mdb-input>
                                <mdb-input label="Address" icon="map-marker-alt" type="text" v-model="address"></mdb-input>
                                
                            </mdb-col>
                            <mdb-col col="2">
                                <mdb-input label="Bed number" icon="bed" type="number" v-model="bed_num"></mdb-input>
                                <mdb-input label="Price from" icon="dollar-sign" type="number" v-model="price_from"></mdb-input>
                            </mdb-col>
                            <mdb-col col="2">
                                <mdb-input label="Price to" icon="dollar-sign" type="number" v-model="price_to"></mdb-input>
                                <mdb-btn style=" height: 25%; margin-left: 15px; width: 100%; text: center" icon="search" v-on:click="search">Search</mdb-btn>
                            </mdb-col>
                            
                        </mdb-row>
                    </mdb-container>
                </div>
                <div class="col-md-1">
                </div>
            </div>
            <div class="row"></div>
            <div class="row"></div>
        </div>
    </div>
</template>

<script>
import { mdbInput, mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue';
export default {
    data() {
        return {
            date_from: "",
            date_to: "",
            country: "",
            town: "",
            type: "",
            address: "",
            bed_num: 0,
            price_from: 0,
            price_to: 0
        }
    },
    components: {
        mdbInput,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbBtn,
    },
    mounted() {
    this.updateR();
    },
    methods: {
        search() {
            this.$store.dispatch("searchResidences", {
                date_from: this.date_from,
                date_to: this.date_to,
                country: this.country,
                town: this.town,
                type: this.type,
                address: this.address,
                bed_num: this.bed_num,
                price_from: this.price_from,
                price_to: this.price_to
            })
            .then(this.updateR());
        },
        updateR(){
            this.$store
            .dispatch("getAllResidences")
            .then(response => (this.residences = response));
        },
    }
}
</script>

<style scoped>
    #search {
        background-color: rgba(255, 255, 255, 0.3);
        margin-top: 10px;
    }

    #filters {
        margin-top: 10px;
    }    
</style>