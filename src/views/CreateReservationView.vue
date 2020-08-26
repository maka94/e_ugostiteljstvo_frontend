<template>
    <mdb-container fluid style="width: 90%;">
        <Navbar />
        <br/>
            <mdb-row>
                <mdb-col lg="5" md="5" s="5" xs="12" style="">
                    <mdb-carousel id="images" :interval="8000" slide :items="items" controlls indicators></mdb-carousel>
                </mdb-col>
                <mdb-col lg="2"></mdb-col>
                <mdb-col lg="5" md="5" s="5" xs="12">
                    <div>
                        <mdb-container id="date_picker">
                            <mdb-row>
                                <mdb-col>
                                    <h5>Choose date:</h5>
                                    <vc-date-picker v-model="range" mode="range" is-inline/>
                                </mdb-col>
                                <mdb-col>
                                    <br>
                                    <mdb-input label="Nights:" type="number" size="sm" v-model="days" />
                                    <mdb-input label="Total:" type="number" size="sm" v-model="total_price"  />
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col>
                                    <br>
                                    <div class="d-flex justify-content-center">
                                        <mdb-btn size="lg" 
                                        gradient="morpheus-den" 
                                        type="button" 
                                        class="btn float-left" 
                                        style="border-radius: 5px;"
                                        v-on:click="reserve">
                                        Create reservation
                                        </mdb-btn>
                                    </div>
                                </mdb-col>
                            </mdb-row>
                        </mdb-container>
                    </div>
                </mdb-col>
            </mdb-row>
            <br><hr style="width:100%;">
            <mdb-row>
                <mdb-col col id="r_view" class="animated slideInLeft"> 
                    <mdb-input label="Type" icon="home" type="text" name="type" v-model="residence.type" disabled/>
                    <mdb-input label="Address" icon="map-marker-alt" type="text" name="address" v-model="residence.address" disabled/>
                    <mdb-input label="Town" icon="city" type="text" name="town" v-model="residence.town" disabled/>
                    <mdb-input label="Country" icon="globe-europe" type="text" name="country" v-model="residence.country" disabled/>
                    <mdb-row>
                        
                    <mdb-col col="7"> 
                        <mdb-input label="Price per night (EUR)" icon="dollar-sign" type="text" id="price" name="price" v-model="residence.price" disabled/>
                    </mdb-col>
                    <mdb-col col="3" style="margin: auto; padding: 1px"> 
                        <div class="grey-text">
                            Convert to:
                            <select class="browser-default custom-select" id="currency" v-model="currency" required>
                                <option value="eur" selected>eur</option>
                                <option value="rsd">rsd</option>
                                <option value="usd">usd</option>
                            </select>  
                        </div>
                    </mdb-col>
                    <mdb-col col="2" style="margin: auto; padding: 1px;">
                        <mdb-btn size="md" id="convert" v-on:click="convert()">Convert</mdb-btn>   
                    </mdb-col>
                    </mdb-row>
                    <mdb-input label="Bed number" icon="bed" type="number" name="bed_number"  v-model="residence.bed_number" disabled/>
                    <mdb-input icon="pencil-alt" wrapperClass="active-pink-textarea" type="textarea" label="Description" name="description" v-model="residence.description" disabled/>
                </mdb-col>
            </mdb-row>
            <br> 
            <mdb-row>
                <mdb-col col id="create" class="animated slideInRight">
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
                                <mdb-input label="Contact:" type="text" name="conatct" v-model="residence.owner.email" size="sm" disabled style="width:50%"/>
                            </mdb-col>
                        </mdb-row>  
                    </mdb-container> 
                    
                </mdb-col>
            </mdb-row>
            <br>
            <h5 style="text-align: center;">Location</h5>
            <hr>
            <mdb-row>
                <mdb-col>
                    <google-map
                     v-bind:lat="Number(this.residence.lat)" 
                     v-bind:lon="Number(this.residence.lon)" 
                     v-bind:reservation="true"
                     style="width:100%;">
                     </google-map>
                </mdb-col>
            </mdb-row>
            <br><hr>
    </mdb-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import GoogleMap from "@/components/GoogleMap.vue"
import axios from 'axios'

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
            },
            currency: "",
        }
    },
    methods: {
        convert: function(){
            var apiKey = "43a2029326d47cd56e04";
            
            var amount = parseInt(document.getElementById("price").value);
            var currency_from = document.getElementById("price").labels[0].innerHTML.split(" ")[3].substring(1, 4);
            var currency_to = this.currency.toUpperCase();

            if(currency_to == ""){
                alert("You must chose currency!")
            } else {
            
                var query = currency_from + '_' + currency_to;
                var url = 'https://free.currconv.com/api/v7/convert?q='
                + query + '&compact=ultra&apiKey=' + apiKey;

                axios.get(url)
                .then(response => {
                    var rate = response.data[query];
                    document.getElementById("price").value = amount*rate;

		            if(currency_to == "RSD"){
                        document.getElementById("price").labels[0].innerHTML = "Price per night (RSD)";
                    }
                    if(currency_to == "USD"){
                        document.getElementById("price").labels[0].innerHTML = "Price per night (USD)";
                    }
                    if(currency_to == "EUR"){
                        document.getElementById("price").labels[0].innerHTML = "Price per night (EUR)";
                    }
                }).catch(error => {
                        alert("Error while conversion!")
                        console.log(error);
                    });
            }  
        },
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

    #info {
        width: 100%;
        height: 51%;
        margin-top: 5px;
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
        background-color: rgba(0, 150, 136, 0.1);
        text-align: center;
        
    }
    .btn-center {
        position:absolute;                  
        bottom:0;                          
        left: 25%;
    }
    
    #images {
        margin: auto;
        height: 200px;
        width: 600px;
    }

    h4 {
        text-align: center;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        margin-top: 10px;
    }

    #date_picker {
        border: 1px solid rgb(221, 221, 221);
        border-radius: 12px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    }

    #convert {
        border-radius: 12px;
        width: 80%;
    }

    #currency {
        width: 70%;
        margin-right: 2px;
    }

</style>