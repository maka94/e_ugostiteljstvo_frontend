<template>
    <mdb-container fluid style="width: 90%;">
        <Navbar />
        <MyProfile />
    </mdb-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MyProfile from "@/components/MyProfile.vue";
import { mdbContainer } from 'mdbvue'
export default {
    components: {
        Navbar,
        MyProfile,
        mdbContainer
    }
}
</script>

