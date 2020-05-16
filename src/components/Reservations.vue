<template>
    <div>
        <Reservation v-if="visible" @close="close"/>
        <mdb-container v-for="reservation in reservations" :key="reservation.id">
            <mdb-row style="margin-top: 5px">
                <div class="reservation" v-if="!visible">
                    <h4>{{ reservation.residence.type }} in <b>{{ reservation.residence.town }} </b></h4>
                    <h6>{{ reservation.residence.country }}</h6>
                    <mdb-row>
                        <mdb-col>
                            <mdb-btn v-on:click="view(reservation)">View</mdb-btn>
                        </mdb-col>
                        <mdb-col>
                            <mdb-btn gradient="young-passion" rounded v-on:click="cancelReservation(reservation)">Cancel</mdb-btn>
                        </mdb-col>
                    </mdb-row>
                </div> 
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue';
import Reservation from "@/components/Reservation.vue"
export default {
    components: {
        mdbContainer, 
        mdbRow, 
        mdbCol, 
        mdbBtn,
        Reservation
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        reservations() {
            return this.$store.getters.getReservations
        }
    },
    created() {
        this.$store.dispatch("getReservations")
    },
    methods: {
        cancelReservation: function(reservation) {
            this.$store.dispatch("cancelReservation", reservation)
        },
        view: function(reservation) {
            this.$store.commit("setReservation", reservation)
            this.visible = true
        },
        close: function() {
            this.visible = false
        }
    }
}
</script>

<style scoped>
    .reservation {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 15px;
        width: 100%;
        padding: 10px;
    }
</style>