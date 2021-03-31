<template>
    <div class="container">
        <div class='row'>
            <div class='col-md-6 mt-3'>
                <div class='article'>
                    <div class="header">
                        <h2 class="primary-font text-center">Let's Get In Touch</h2>
                        <p>Tell us about your project and we'll reach out within 24 hours.</p>
                    </div>
                    <contact-form />
                </div>
                
            </div>
            <div class='col-md-6 mt-3'>
                <div class='article'>

                </div>
                <h2 class='primary-font text-center'>Contact Us Directly</h2>
                <a :href='"tel:" + getConfig("PHONE")'>
                    <button class='btn btn-outline-primary w-100 btn-lg call-out'>
                        Call Us: {{getConfig("PHONE")}}
                    </button>
                </a>
                <a :href='"mailto:" + getConfig("EMAIL")'>
                    <button class='btn btn-outline-primary w-100 btn-lg call-out'>
                        Email Us
                    </button>
                </a>
                <a :href='"mailto:" + getConfig("RESUME_EMAIL")'>
                    <button class='btn btn-outline-primary w-100 btn-lg call-out'>
                        Send Us Your Resume
                    </button>
                </a>

                <h2 class='primary-font text-center mt-3'>Location</h2>

                <h5><u>Ann Arbor</u></h5>
                <p class='m-0'>3167 Wolverine Dr</p>
                <p class='m-0'>Ann Arbor, MI, 48108</p>
                <p>United States of America</p>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Vue} from "vue-property-decorator";
    import ContactFormService, {ISubmissionForm} from "@/services/contactForm.service";
    import {HashMap} from "@/services/base.service";
    import ContactForm from "@/components/ContactForm.vue";
    import ConfigMixin from "@/mixins/ConfigMixin";

    @Component({
        name: "Contact",
        components: {
            ContactForm,
        }
    })
    export default class Contact extends Mixins(ConfigMixin) {
    }
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";

    .call-out {
        margin: 1rem 0 1rem 0;
        font-weight: 600;
        border-width: .15rem;
        text-decoration: none;
    }
</style>