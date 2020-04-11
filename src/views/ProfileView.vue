<template>
    <div class="bg" overlay = "black-strong">
        <div class="overlay"></div>
        <Navbar />
        <MyProfile />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MyProfile from "@/components/MyProfile.vue";
export default {
    components: {
        Navbar,
        MyProfile
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
</style>