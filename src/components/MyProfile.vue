<template>
    <div>
        <mdb-container fluid style="padding: 10px;">
            <div id="change_pass" v-if="change_password" class="animated slideInUp">
                <mdb-input label="Enter your old password" v-model="password.old_password" type="password"></mdb-input>
                <mdb-input label="Enter new password" v-model="password.new_password" type="password"> </mdb-input>
                <mdb-input label="Confirm new password" v-model="password.confirm" type="password"> </mdb-input>
                    
                <mdb-btn gradient="young-passion" v-on:click="change_password=false" style="width: 30%">Close</mdb-btn>
                <mdb-btn v-on:click="modal=true, change_password=false" style="left: 30%;">Save changes</mdb-btn>  
            </div>
            <mdb-row>
               
                <mdb-col>
                    slika
                </mdb-col>
                <mdb-col>
                    <div class="grey-text">
                        <mdb-input label="First name" v-model="profile.first_name"></mdb-input>
                        <mdb-input label="Last name" v-model="profile.last_name"> </mdb-input>
                        <mdb-input label="Username" v-model="profile.username"> </mdb-input>
                        <mdb-input label="E-mail" v-model="profile.email"> </mdb-input>
                    </div> 
                    <mdb-btn type="button" gradient="aqua" v-on:click="modal=true, update=true" id="edit_btn">Edit profile</mdb-btn> 
                    <mdb-btn type="button" gradient="amy-crisp" v-on:click="change_password=true" id="edit_btn">Change password</mdb-btn>
                    <mdb-modal :show="modal" @close="modal = false">
                        <mdb-modal-header>
                            <mdb-modal-title>Are you sure you want to save changes?</mdb-modal-title>
                        </mdb-modal-header>
                        <mdb-modal-footer>
                            <mdb-btn color="secondary" @click.native="modal = false, update=false">Close</mdb-btn>
                            <mdb-btn color="primary" v-on:click="updateProfile">Save changes</mdb-btn>
                        </mdb-modal-footer>
                    </mdb-modal>   
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol,  mdbInput, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalFooter } from 'mdbvue';
import toast from "@/assets/js/services/toast";
export default {
    name: "profile",
    components: {
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbInput,
        mdbBtn, 
        mdbModal, 
        mdbModalHeader, 
        mdbModalTitle,
        mdbModalFooter
    },
    data() {
        return {
            profile: { 
                first_name: "",
                last_name: "",
                username: "",
                email: ""
            },
            password: {
                old_password: "",
                new_password: "",
                confirm: ""
            },
            modal: false,
            update: false,
            change_password: false
        }
    },
    created() {
        this.$store.dispatch("getProfile")
        .then(response => (this.profile = response))
    },
    methods: {
        updateProfile(){
            if(this.update){

                if(this.profile.first_name && this.profile.last_name && this.profile.username && this.profile.email){
                    this.$store.dispatch("updateProfile", this.profile)
                    .then(response => (this.profile = response))
                    this.modal = false;
                    this.update = false;
                } else {
                    if(!this.profile.first_name) toast.error("First name cannot be empty!")
                    if(!this.profile.last_name) toast.error("Last name cannot be empty!")
                    if(!this.profile.username) toast.error("Username cannot be empty!")
                    if(!this.profile.email) toast.error("Email cannot be empty!")
                } 
            } else {
                if(this.password.old_password && this.password.new_password && this.password.confirm) {
                    this.$store.dispatch("changePassword", this.password)
                    .then(this.change_password = false)
                    this.modal = false
                }
            }
        }
    }
}
</script>

<style scoped>
    .row{
        margin-top: 150px;
        text-align: center;
    }

    .grey-text {
        background-color: rgba(255, 235, 59, 0.3);
        border-radius: 25px;
        padding: 10px;
        width: 70%;
    }

    #edit_btn {
        right: 14%;
        width: 30%;
    }

    #change_pass {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        width: 35%;
        height: 20%;
        padding: 10px;
        margin-top: 15px;
        margin: auto;
    }
   

</style>