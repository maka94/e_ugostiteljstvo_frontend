<template>
    <div fluid>
        <div class="bg" overlay="black-strong">
            <div class="overlay"></div>
        </div>
            <Navbar />
            <mdb-container style="margin-top: 10px">
                <mdb-row>
                    <mdb-col col="6" id="r_view" class="animated slideInLeft"> 
                        <mdb-input label="Type" icon="home" type="text" name="type" v-model="residence.type" disabled/>
                        <mdb-input label="Address" icon="map-marker-alt" type="text" name="address" v-model="residence.address" disabled/>
                        <mdb-input label="Town" icon="city" type="text" name="town" v-model="residence.town" disabled/>
                        <mdb-input label="Country" icon="globe-europe" type="text" name="country" v-model="residence.country" disabled/>
                        <mdb-input label="Price per day" icon="dollar-sign" type="text" name="price" v-model="residence.price" disabled/>
                        <mdb-input label="Bed number" icon="bed" type="number" name="bed_number"  v-model="residence.bed_number" disabled/>
                        <mdb-input icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" v-model="residence.description" disabled/>
                    </mdb-col>
                    <mdb-col col="6" id="create" class="animated slideInRight">
                        <mdb-container id="info">
                            <h5>{{ residence.type }} owner info:</h5>
                            <hr>
                            <mdb-row>
                                <mdb-col col="2">
                                    <mdb-icon icon="user" size="lg" style="margin-top:25px" />
                                </mdb-col>
                                <mdb-col col="10">
                                    <mdb-input label="First name:" type="text" name="first_name" v-model="residence.owner.first_name" size="sm" disabled style="width:50%"/>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col="2">
                                    <mdb-icon icon="user" size="lg" style="margin-top:25px" />
                                </mdb-col>
                                <mdb-col col="10">
                                    <mdb-input label="Last name:" type="text" name="last_name" v-model="residence.owner.last_name" size="sm" disabled style="width:50%" />
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col col="2">
                                    <mdb-icon icon="at" size="lg" style="margin-top:25px" />
                                </mdb-col>
                                <mdb-col col="10">
                                    <mdb-input label="E-mail:" type="text" name="conatct" v-model="residence.owner.email" size="sm" disabled style="width:50%"/>
                                </mdb-col>
                            </mdb-row>    
                        </mdb-container> 
                        <mdb-container id="date_picker" style="margin-top: 2px; margin-bottom: 2px;">
                            <mdb-row>
                                <mdb-col>
                                    <h5>Choose date:</h5>
                                    <vc-date-picker v-model="range" mode="range" is-inline/>
                                </mdb-col>
                                <mdb-col class="btn-center">
                                    <mdb-input label="Number of days:" type="number" size="sm" v-model="days" style="width:30%; left: 30%;" />
                                    <mdb-input label="Total:" type="number" size="sm" v-model="total_price" style="width:30%; left: 30%" />
                                    <mdb-btn gradient="morpheus-den" type="button" v-on:click="reserve" class="rounded">Create reservation</mdb-btn>
                                </mdb-col>
                            </mdb-row>
                        </mdb-container>
                    </mdb-col>
                </mdb-row>
                <mdb-row>
                    <mdb-col col="1"></mdb-col>
                    <mdb-col col="10">
                        <h4>Gallery</h4>
                        <mdb-carousel id="images" :interval="8000" slide :items="items" controlls indicators></mdb-carousel>
                    </mdb-col>
                    <mdb-col col="1"></mdb-col>
                </mdb-row>
                <mdb-row>
                    <google-map v-bind:lat="Number(this.residence.lat)" v-bind:lon="Number(this.residence.lon)" v-bind:reservation="true"></google-map>
                </mdb-row>
            </mdb-container>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import GoogleMap from "@/components/GoogleMap.vue";

import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbIcon, mdbBtn, mdbCarousel } from 'mdbvue';
export default {
    components: {
        Navbar,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbInput,
        mdbIcon,
        mdbBtn,
        mdbCarousel,
        GoogleMap
    },
    computed: {
        residence() {
            return this.$store.getters.getResidence
        },
        days () {
            return Math.floor(( Date.parse(this.range.end) - Date.parse(this.range.start) ) / 86400000); 
        },
        total_price() {
            return this.days*this.residence.price
        },
        items() {
            var images =  []
            this.residence.images.forEach(getImage)
            function getImage(value) {
                console.log(value.image)
                var image  = {img:true, src: "http://localhost:8000/residences/download/"+value.image, mask: "rgba-purple-slight"}
                images.push(image)
            }
            return images
        },
       
    }, 
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date()
            }
        }
    },
    methods: {
        reserve: function() {
            console.log(this.range.start.getFullYear()+"-"+(this.range.start.getMonth()+1)+"-"+this.range.start.getDate())
            console.log(this.residence.id)
            this.$store.dispatch("create_reservation", {
                id: this.residence.id,
                date_from: this.range.start.getFullYear()+"-"+(this.range.start.getMonth()+1)+"-"+this.range.start.getDate(),
                date_to: this.range.end.getFullYear()+"-"+(this.range.end.getMonth()+1)+"-"+this.range.end.getDate()
            })
        }
    }
}
</script>

<style scoped>
.bg {
    background-image: url("../assets/land_page_background.jpg");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-attachment: fixed;
  }

  .bg .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: .2;
    background: #8585ad;
}

    #info {
        width: 100%;
        height: 51%;
        margin-top: 5px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 15px;
        text-align: center;
        padding: 5px;
    }

    hr {
        width: 50%;
        color: rgba(255, 255, 255, 0.3);
    }

    #r_view {
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.4);
    }

    #create {
        border-radius: 10px;
        background-color: rgba(244, 67, 54, 0.3);
        text-align: center;
        
    }
    .btn-center {
        position:absolute;                  
        bottom:0;                          
        left: 25%;
    }
    
    #images {
        margin: auto;
    }

    h4 {
        text-align: center;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        margin-top: 10px;
    }
</style>