<template>
    <mdb-container fluid style="width: 90%;">
        <br>
        <mdb-row>
            <div id="change_pass" v-if="change_password" class="animated zoomIn">
            <mdb-input label="Enter your old password" v-model="password.old_password" type="password"></mdb-input>
            <mdb-input label="Enter new password" v-model="password.new_password" type="password"> </mdb-input>
            <mdb-input label="Confirm new password" v-model="password.confirm" type="password"> </mdb-input>
            <div class="clearfix">
                <mdb-btn size="md" style="width: 40%;" gradient="young-passion" v-on:click="change_password=false" class="btn float-left">Close</mdb-btn>
                <mdb-btn size="md" style="width: 40%;" v-on:click="modal=true, change_password=false" class="btn float-right">Save changes</mdb-btn>  
            </div>    
        </div>
        </mdb-row>
        <mdb-row v-if="!change_password">
            <mdb-col>
                <mdb-icon icon="user-circle" class="cyan-text pr-3" size="5x"/>
                <br>
                <br>
                <h4>User details</h4>
                <hr style="width: 70%;">
                <div class="grey-text">
                    <mdb-input label="First name" v-model="profile.first_name"></mdb-input>
                    <mdb-input label="Last name" v-model="profile.last_name"> </mdb-input>
                    <mdb-input label="Username" v-model="profile.username"> </mdb-input>
                    <mdb-input label="E-mail" v-model="profile.email"> </mdb-input>
                </div> 
            </mdb-col>
            <mdb-col>
                <mdb-row>
                    <mdb-btn color="mdb-color" v-on:click="modal=true, update=true" id="edit_btn">Edit profile</mdb-btn> 
                </mdb-row>
                <br>
                <mdb-row>
                    <mdb-btn color="blue-grey" v-on:click="change_password=true" id="pass_btn">Change password</mdb-btn>
                </mdb-row>
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
</template>

<script>
import { mdbContainer, mdbRow, mdbCol,  mdbInput, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalFooter, mdbIcon } from 'mdbvue';
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
        mdbModalFooter,
        mdbIcon
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
        text-align: center;
    }

    .grey-text {
        background-color: #fafafa;
        border-radius: 15px;
        padding: 10px;
        border: 1px solid rgb(221, 221, 221);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    }

    #edit_btn {
        border-radius: 100px;
        width: 80%;
        margin: auto;
    }

    #pass_btn {
        border-radius: 100px;
        width: 80%;
        margin: auto;
    }

    #change_pass {
        background-color: rgba(255, 255, 255, 0.4);
        border: 1px solid rgb(221, 221, 221);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        border-radius: 12px;
        width: 35%;
        height: 20%;
        padding: 15px;
        margin: auto;
    }
   

</style>