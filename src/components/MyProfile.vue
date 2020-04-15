<template>
    <div>
        <mdb-container fluid>
            <mdb-row>
                <mdb-col xs="12" sm="6" md="4">
                </mdb-col>
                <mdb-col xs="12" sm="6" md="8">
                    <mdb-card>
                        <mdb-card-title> Profile  </mdb-card-title>
                        <mdb-card-body>
                            <form action="#">
                                <div class="grey-text">
                                    <mdb-input label="First name" v-model="profile.first_name"></mdb-input>
                                    <mdb-input label="Last name" v-model="profile.last_name"> </mdb-input>
                                    <mdb-input label="Username" v-model="profile.username"> </mdb-input>
                                    <mdb-input label="E-mail" v-model="profile.email"> </mdb-input>
                                </div>
                            </form>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbInput, mdbCardTitle, mdbCardBody } from 'mdbvue';
export default {
    name: "profile",
    components: {
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbCard,
        mdbInput,
        mdbCardTitle,
        mdbCardBody
    },
    data() {
        return {
            profile: { 
                first_name: "",
                last_name: "",
                username: "",
                email: ""
            }
        }
    },
    methods: {
        updateProfile(){
            this.$store.dispatch("getProfile")
            .then(response => (this.profile = response));
        }
    },
    async mounted(){
        this.updateProfile()
    }
}
</script>

<style scoped>
    .row{
        margin-top: 150px;
        text-align: center;
    }

    .row #card {
        border-width: 5%;
        border-color: slategrey;
    }

</style>