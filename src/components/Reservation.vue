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
                    Slike
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput } from 'mdbvue';
export default {
    components: {
        mdbContainer,
        mdbRow, 
        mdbCol,
        mdbBtn,
        mdbInput
    },
    computed: {
        reservation() {
            return this.$store.getters.getReservation
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
</style>