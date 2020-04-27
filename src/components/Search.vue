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
import toast from "@/assets/js/services/toast";
export default {
    data() {
        return {
            date_from: "",
            date_to: "",
            country: "",
            town: "",
            type: "",
            address: "",
            bed_num: "",
            price_from: "",
            price_to: "",
            residences: []
        }
    },
    components: {
        mdbInput,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbBtn,
    },
    methods: {
        search() {
            if(this.date_from && this.date_to && this.country && this.town) {
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
                .then(response => {
                    this.residences = response
                    console.log("Residences: "+this.residences.length)
                    this.$emit("filter-residences", this.residences)
                });
            } else {
                if(!this.date_from) toast.error("Date from is required field!")
                if(!this.date_to) toast.error("Date to is required field!")
                if(!this.country) toast.error("Country is required field!")
                if(!this.town) toast.error("Town is required field!")
            }
            
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