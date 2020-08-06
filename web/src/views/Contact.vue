<template>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="header">
                <h3 class="primary-font text-center">Contact Me</h3>
                <div class="header-body secondary-font" v-if="!submitted">
                    <p class="text-lg-center">Please reach out to me if you're interested in my work and would like to speak further.</p>
                    <p class="text-lg-center">I look forward to being in touch!</p>
                </div>
            </div>
            <div class="row" v-if="initialized && !submitted">
                <div class="form-group col-md-6">
                    <label class="primary-font">Name</label>
                    <input type="text" class="form-control" v-model="submission.name" :class="{'is-invalid': errors.hasOwnProperty('name')}" />
                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('name')">
                        {{errors.name}}
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="primary-font">Email</label>
                    <input type="email" class="form-control" v-model="submission.email" :class="{'is-invalid': errors.hasOwnProperty('email')}"/>
                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('email')">
                        {{errors.email}}
                    </div>
                </div>
                <div class="form-group col-12">
                    <label class="primary-font">Company Name</label>
                    <input type="text" class="form-control" v-model="submission.companyName" />
                </div>
                <div class="form-group col-12">
                    <label class="primary-font">Comments</label>
                    <textarea class="form-control" v-model="submission.comments" style="resize: none" rows="5"></textarea>
                </div>
                <div class="col-12">
                    <p class="secondary-font" style="color: red" v-if="Object.keys(errors).length > 0">There were errors in your submission. Please correct them and re-submit</p>
                </div>
                <div class="form-group col-12">
                    <button class="form-control btn btn-primary primary-font">Submit</button>
                </div>
            </div>
            <div class="row" v-if="submitted">
                <div class="col-12">
                    <p class="text-lg-center secondary-font">Submission Received. I will reach out shortly.</p>
                </div>

            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ContactFormService, {ISubmissionForm} from "@/services/contactForm.service";
    import {HashMap} from "@/services/base.service";

    @Component({
        name: "ContactForm"
    })
    export default class ContactForm extends Vue {

        private initialized = false;
        private submission!: ISubmissionForm;
        private service!: ContactFormService;

        private errors: HashMap<string> = {};

        private submitted = false;

        private clear() {
            this.submission = {
                companyName: "",
                name: "",
                email: "",
                comments: "",
            }
            this.errors = {};
        }

        private mounted() {
            this.clear();
            this.service = new ContactFormService();
            this.initialized = true;
        }

        private async submit() {
            const response = await this.service.post(this.submission);
            if (response.success) this.submitted = true;
            else this.errors = response.error;
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";
</style>