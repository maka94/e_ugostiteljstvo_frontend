<template>
  <div>
    <div>
        <div class="grey-text">
            <mdb-icon icon="map-marker-alt" />
                <label>
                    <gmap-autocomplete placeholder="Enter address"
                    @place_changed="setPlace">
                    </gmap-autocomplete>
                    <button @click="addMarker">Add</button>
                </label>
                <br/>
        </div>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
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
import { mdbIcon } from 'mdbvue';
export default {
  name: "GoogleMap",
  components: {
      mdbIcon
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
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
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        //console.log(this.currentPlace.address_components)
        this.currentPlace = null;
        console.log(this.places[0].address_components[0].long_name)
        console.log(this.places[0].address_components[1].long_name)
        console.log(this.places[0].address_components[2].long_name)
        console.log(this.places[0].address_components[3].long_name)
        console.log(this.places[0].address_components[4].long_name)
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>