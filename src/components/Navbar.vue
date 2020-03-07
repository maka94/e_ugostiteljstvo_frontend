<template>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand href="#">
      <h5>
        Welcome
        <b-badge variant="dark">e-ugostiteljstvo</b-badge>
        <Dropdown />
      </h5>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
import Dropdown from './Dropdown'
export default {
  components: {
    Dropdown
  },
}
</script>