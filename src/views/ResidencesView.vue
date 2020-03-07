<template>
    <div>
        <Navbar />
        <Residences />
    </div> 
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Residences from '@/components/Residences.vue';
export default {
    components: {
        Navbar,
        Residences
    }
}
</script>