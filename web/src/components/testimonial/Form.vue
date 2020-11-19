<template>
    <form @submit.prevent>
        <div class="row">
            <form-group class="col-md-6" :field="name" :label="Name" v-model="name" type="text" :errors="errors" />
            <form-group class="col-md-6" :field="email" :label="Email" v-model="email" type="text" :errors="errors" />
        </div>
    </form>
</template>

<script lang="ts">

import {Vue, Component} from "vue-property-decorator";
import FormGroup from "./../ui/Forms/FormGroup.vue";
import {ITestimonialLinkDTO} from "./../../services/testimonial.service";

@Component({
    components: {
        FormGroup,
    }
})
export default class TestimonialForm extends Vue {
    private initialized = false;
    private submission!: 
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