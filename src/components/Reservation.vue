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
                        
                        
                        <mdb-btn v-on:click="close">Close</mdb-btn>
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
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput, mdbCarousel } from 'mdbvue';
export default {
    components: {
        mdbContainer,
        mdbRow, 
        mdbCol,
        mdbBtn,
        mdbInput,
        mdbCarousel
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
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 25px;
    }

    h5 {
        text-align: center;
    }

    .info {
        padding: 10px;
    }

    #info {
        background-color: rgba(255, 255, 255, 0.4);
        margin-bottom: 20px;
        border-radius: 25px;
        padding: 10px;
    }


</style>