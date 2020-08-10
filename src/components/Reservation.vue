<template>
    <div>
        <mdb-container>
            <mdb-row>
                <mdb-col>
                    <div id="residence">
                        <h5>{{ reservation.residence.type }} in {{ reservation.residence.town }}, {{ reservation.residence.country }}</h5>
                        <mdb-input label="Address" icon="map-marker-alt" type="text" name="address" v-model="reservation.residence.address" disabled/>
                        <mdb-input label="From" icon="calendar" type="date" v-model="reservation.date_from" disabled />
                        <mdb-input label="To" icon="calendar" type="date" v-model="reservation.date_to" disabled />
                        <mdb-input label="Bed number" icon="bed" type="number" name="bed_number"  v-model="reservation.residence.bed_number" disabled/>
                        <mdb-input label="Price per day" icon="dollar-sign" type="text" name="price" v-model="reservation.residence.price" disabled/>
                        <mdb-input label="Total" icon="dollar-sign" type="text" name="price" v-model="reservation.price" disabled/>
                        
                        <div class="d-flex justify-content-center">
                            <mdb-btn v-on:click="close" style="width: 80%; border-radius: 15px;">Close</mdb-btn>
                        </div>
                        
                    </div>
                </mdb-col>
                <mdb-col>
                    <mdb-container id="info">
                        <h5>Owner info:</h5>
                        <mdb-row class="info">
                        <h6> Name: {{ reservation.residence.owner.first_name }} </h6>
                        <h6> {{ reservation.residence.owner.last_name }} </h6> 
                        </mdb-row>
                        <mdb-row class="info">
                            <h6> E-mail: {{ reservation.residence.owner.email }} </h6>
                        </mdb-row>
                    </mdb-container>
                    <mdb-carousel id="images" :interval="8000" slide :items="items" controlls indicators></mdb-carousel>
                </mdb-col>
            </mdb-row>
            <br>
            <h5 style="text-align: center;">Location</h5>
            <hr style="width: 80%;">
            <mdb-row>
                <mdb-col>
                    <google-map
                     v-bind:lat="Number(this.reservation.residence.lat)" 
                     v-bind:lon="Number(this.reservation.residence.lon)" 
                     v-bind:reservation="true"
                     style="width:100%;">
                     </google-map>
                </mdb-col>
            </mdb-row>
            <br>
            
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput, mdbCarousel } from 'mdbvue';
import GoogleMap from "@/components/GoogleMap.vue";
export default {
    components: {
        mdbContainer,
        mdbRow, 
        mdbCol,
        mdbBtn,
        mdbInput,
        mdbCarousel,
        GoogleMap
    },
    computed: {
        reservation() {
            return this.$store.getters.getReservation
        },
        items() {
            var images =  []
            this.reservation.residence.images.forEach(getImage)
            function getImage(value) {
                console.log(value.image)
                var image  = {img:true, src: "http://localhost:8000/residences/download/"+value.image, mask: "rgba-purple-slight"}
                images.push(image)
            }
            return images
        }
    },
    methods: {
        close: function() {
            this.$emit("close")
        }
    }
}
</script>

<style scoped>
    #residence {
        background-color: #fafafa;
        border-radius: 15px;
        padding: 10px;
        border: 1px solid rgb(221, 221, 221);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    }

    h5 {
        text-align: center;
    }

    .info {
        padding: 10px;
    }

    #info {
        background-color: rgba(0, 150, 136, 0.1);
        border: 1px solid rgb(221, 221, 221);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        margin-bottom: 20px;
        border-radius: 15px;
        padding: 10px;
    }


</style>