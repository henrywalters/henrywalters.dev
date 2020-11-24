<template>
    <form @submit.prevent>
        <h5>New Testimonial Link</h5>
        <div class="row" v-if="initialized">
            <form-group class="col-md-6" label="Name" field="name" :errors="errors">
                <input class="form-control" v-model="submission.name" />
            </form-group>
            <form-group class="col-md-6" label="Email" field="email" :errors="errors">
                <input class="form-control" v-model="submission.email" />
            </form-group>
            <form-group class="col-md-8" label="Company Name" field="companyName" :errors="errors">
                <input class="form-control" v-model="submission.companyName" />
            </form-group>
            <div class="custom-control custom-checkbox" style="margin-top: 38px">
                <input type="checkbox" class="custom-control-input" id="anon" v-model="submission.anonymous">
                <label class="custom-control-label secondary-font" for="anon">Anonymous Testimonial</label>
            </div>
            <div class="form-group col-md-12">
                <button class="form-control btn btn-primary" @click="submit">Submit</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import FormGroup from "@/components/ui/forms/FormGroup.vue";
    import {ITestimonial, ITestimonialLinkDTO, ITestimonialDTO, TestimonialService} from "./../services/testimonial.service";
    import {HashMap} from "./../services/base.service";
    import NotificationMixin from "./../mixins/NotificationMixin";


    @Component({
        name: "TestimonialLinkForm",
        components: {
            FormGroup,
        }
    })
    export default class TestimonialForm extends Mixins(NotificationMixin) {

        public initialized = false;
        private submission!: ITestimonialLinkDTO;
        private service!: TestimonialService;

        private errors: HashMap<string> = {};

        private submitted = false;

        private rating: number = 0;
        private name: string = "";

        private clear() {
            this.submission = {
                companyName: "",
                name: "",
                email: "",
                anonymous: false,
            }
            this.rating = 0;
            this.errors = {};
        }

        private async created() {
            this.initialized = false;
            this.service = new TestimonialService();
        
            this.clear();
        
            this.initialized = true;
        }

        private async submit() {
            const response = await this.service.post(this.submission);
            if (response.success) {
                this.notifySuccess("Created testimonial");
                this.$emit('create');
                this.clear();
            } else {
                this.notifyError("Failed to create testimonial, check errors");
                this.errors = response.error;
            }
        }
    }

</script>