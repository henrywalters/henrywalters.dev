<template>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="header">
                <h3 class="primary-font text-center">Contact Me</h3>
                <div class="header-body secondary-font ">
                    <p class="text-lg-center">Please reach out to me if you're interested in my work and would like to speak further.</p>
                    <p class="text-lg-center">I look forward to being in touch!</p>
                </div>
            </div>
            <div class="row" v-if="initialized">
                <div class="form-group col-md-6">
                    <label class="primary-font">Name</label>
                    <input type="text" class="form-control" v-model="submission.name" />
                </div>
                <div class="form-group col-md-6">
                    <label class="primary-font">Email</label>
                    <input type="email" class="form-control" v-model="submission.email" />
                </div>
                <div class="form-group col-12">
                    <label class="primary-font">Company Name</label>
                    <input type="text" class="form-control" v-model="submission.companyName" />
                </div>
                <div class="form-group col-12">
                    <label class="primary-font">Comments</label>
                    <textarea class="form-control" v-model="submission.comments" style="resize: none" rows="5"></textarea>
                </div>
                <div class="form-group col-12">
                    <button class="form-control btn btn-primary primary-font">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    interface ISubmissionForm {
        name: string;
        companyName: string;
        email: string;
        comments: string;
    }

    @Component({
        name: "ContactForm"
    })
    export default class ContactForm extends Vue {

        private initialized = false;
        private submission!: ISubmissionForm;

        private clear() {
            this.submission = {
                companyName: "",
                name: "",
                email: "",
                comments: "",
            }
        }

        private mounted() {
            this.clear();
            this.initialized = true;
            console.log(this.submission);
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";
</style>