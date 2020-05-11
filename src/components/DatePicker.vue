<template>
    <div>
        <vc-date-picker v-model="range" mode="range" is-inline/>
    </div>
</template>

<script>

export default {
    name: "datepicker",
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date()
            }
        };
    },
    
}
</script>

<style scoped>
  </style>