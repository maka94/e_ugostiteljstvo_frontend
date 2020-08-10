<template>
    <div>
        <Reservation v-if="visible" @close="close"/>
        <mdb-container v-for="reservation in reservations" :key="reservation.id">
            <mdb-row style="margin-top: 5px" v-if="reservations.length > 0">
                <div class="reservation" v-if="!visible">
                    <mdb-icon icon="calendar-day"/><h4>{{ reservation.residence.type }} in {{ reservation.residence.town }},</h4>
                    <h6>{{ reservation.residence.country }}</h6>
                    <mdb-row>
                        <mdb-col>
                            <div class="float-left">
                                <mdb-btn class="btn" size="md" v-on:click="view(reservation)">View</mdb-btn>
                            </div>
                            <div class="float-right">
                                <mdb-btn class="btn" gradient="young-passion" size="md" v-on:click="cancelReservation(reservation)">Cancel</mdb-btn>
                            </div>
                        </mdb-col>
                    </mdb-row>
                </div> 
            </mdb-row>
        </mdb-container>
        <mdb-container>
            <mdb-row v-if="reservations.length == 0">
                <mdb-col>
                    <br>
                    <div id="message">
                        You don't have any reservations yet. 
                    </div>
                    <hr style="width: 60%;">
                    <div class="d-flex justify-content-center">
                        <mdb-btn size="lg" v-on:click="home" id="btnF">Find something nice</mdb-btn>
                    </div>
                    
                </mdb-col>
                
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbIcon } from 'mdbvue';
import Reservation from "@/components/Reservation.vue"
export default {
    components: {
        mdbContainer, 
        mdbRow, 
        mdbCol, 
        mdbBtn,
        mdbIcon,
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
        },
        home(){
            this.$router.push({ name: "home" })
        }
    }
}
</script>

<style scoped>
    .reservation {
        background-color: rgba(0, 150, 136, 0.1);
        border: 1px solid rgb(221, 221, 221);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        border-radius: 15px;
        width: 100%;
        padding: 10px;
    }

    .btn {
        border-radius: 5px;
        width: 130px;
    }

    #message {
        margin: auto;
        text-align: center;
        text-decoration: darkgrey;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 24px;
        background-color: #eeeeee ;
        border-radius: 10px;
    }

    #btnF {
        width: 300px;
        background-color: #64ffda ;
    }
</style>