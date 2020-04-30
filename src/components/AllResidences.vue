<template>
    <div>
        <mdb-container>
            <mdb-row>
                <mdb-col class="mb-3" xs="12" sm="6" md="4" v-for="residence in residences" :key="residence.id">
                    <mdb-card-group deck id="residences_cards">
                        <mdb-card>
                            <mdb-view hover>
                                <a href="#!">
                                    <mdb-card-image src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg" alt="Card image cap"></mdb-card-image>
                                    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                                </a>
                            </mdb-view>
                            <mdb-card-body>
                                <mdb-card-title> {{residence.type}} </mdb-card-title>
                                <mdb-card-text> {{residence.town}}, {{residence.country}} </mdb-card-text>
                                <mdb-row>
                                    <mdb-col xs="12" sm="6" md="4">
                                        
                                    </mdb-col>
                                    <mdb-col>
                                        <mdb-btn size="lg" v-on:click="view(residence)" gradient="tempting-azure" rounded><mdb-icon icon="eye"/></mdb-btn>
                                    </mdb-col>
                                    <mdb-col xs="12" sm="6" md="4" class="mr-3"></mdb-col>
                                </mdb-row>
                            </mdb-card-body>
                        </mdb-card>
                    </mdb-card-group>
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCardGroup, mdbCard, mdbView, mdbCardImage, mdbMask, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbIcon, /*mdbInput*/ } from 'mdbvue';
export default {
    components: {
        mdbContainer, 
        mdbRow, 
        mdbCol, 
        mdbCardGroup, 
        mdbCard, 
        mdbView, 
        mdbCardImage, 
        mdbMask, 
        mdbCardBody, 
        mdbCardTitle, 
        mdbCardText, 
        mdbBtn, 
        mdbIcon
    },
    data() {
        return {
            visible: false
        }
    },
    props: {
        residences: {
            type: Array
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
#residences_cards {
    border-spacing: 10px;
}
</style>