<template>
  <div class="bg" overlay = "black-strong">
    <div class="overlay"></div>
    <Register />
  </div>
</template>

<script>
import Register from "@/components/Register.vue";
export default {
  components: {
    Register
  }
};
</script>

<style scoped>
  .bg {
    background-image: url("../assets/login-background.jpg");
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
