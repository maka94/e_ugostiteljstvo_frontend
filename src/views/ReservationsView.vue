<template>
    <mdb-container fluid style="width: 90%;">
        <Navbar />
        <br>
        <Reservations />
    </mdb-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Reservations from "@/components/Reservations.vue"
import { mdbContainer } from 'mdbvue'
export default {
    components: {
        Navbar,
        Reservations,
        mdbContainer
    }
}
</script>
