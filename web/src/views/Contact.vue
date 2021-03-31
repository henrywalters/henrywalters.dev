<template>
    <div class="container">
        <div class='row'>
            <div class='col-md-6'>
                <contact-form />
            </div>
            <div class='col-md-6'>
                <h1 class='primary-font'>Contact Us</h1>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ContactFormService, {ISubmissionForm} from "@/services/contactForm.service";
    import {HashMap} from "@/services/base.service";
    import ContactForm from "@/components/ContactForm.vue";

    @Component({
        name: "Contact",
        components: {
            ContactForm,
        }
    })
    export default class Contact extends Vue {

    }
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";
</style>