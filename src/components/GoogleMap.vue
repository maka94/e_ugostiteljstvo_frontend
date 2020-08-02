<template>
  <div>
    <div>
        <div class="grey-text">
            <gmap-autocomplete placeholder="Enter address" style="width: 81%;"
            @place_changed="setPlace">
            </gmap-autocomplete>
          <mdb-btn id="addBtn" size = "sm" @click="addMarker">Add</mdb-btn>
          <br/>
        </div>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:400px; height: 200px; margin: auto;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import {  mdbBtn } from 'mdbvue';
export default {
  name: "GoogleMap",
  components: {
      mdbBtn
  },
  data() {
    return {
      center: { lat: 44.787389, lng: 20.447308 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  props: {
    lat: Number,
    lon: Number,
    reservation: Boolean
  },
  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        if(this.markers.length > 0){
          this.markers = [];
        }
        if(this.places.length > 0) {
          this.places = [];
        }
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        console.log(this.currentPlace.geometry.location.lat() + " " + this.currentPlace.geometry.location.lng())
        //this.currentPlace = null;
        console.log(this.places[0].address_components[0].long_name)
        console.log(this.places[0].address_components[1].long_name)
        console.log(this.places[0].address_components[2].long_name)
        console.log(this.places[0].address_components[3].long_name)
        console.log(this.places[0].address_components[4].long_name)
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        if(this.lat && this.lon) {
          const marker = {
            lat: this.lat,
            lng: this.lon
          };

          this.markers.push({ position: marker });
          this.center = marker;
        } else {
            this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
       
      });
    }
  }
};
</script>

<style scoped>
  #addBtn {
    font-size: 11px;
    text-align: center;
  }
</style>