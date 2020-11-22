<template>
    <form @submit.prevent>
        <div class="row" v-if="initialized">
            <form-group class="col-md-6" label="Name" field="name" v-model="submission.name" :errors="errors">
                <input class="form-control" v-model="submission.name" />
            </form-group>
            <form-group class="col-md-6" label="Email" field="email" v-model="submission.email" :errors="errors">
                <input class="form-control" v-model="submission.email" />
            </form-group>
            <form-group class="col-md-12" label="Company Name" field="companyName" v-model="submission.companyName" :errors="errors">
                <input class="form-control" v-model="submission.companyName" />
            </form-group>
            <form-group class="col-md-12" label="Rating" field="rating" :errors="errors">
                <star-rating v-model="rating" />
            </form-group>
            <form-group class="col-md-12" label="Testimonial" field="testimonial" v-model="submission.testimonial" :errors="errors">
                <textarea v-model="submission.testimonial" class="textarea form-control" rows="3" />
            </form-group>
            <div class="form-group col-md-12">
                <button class="form-control btn btn-primary" @click="submit">Submit</button>
            </div>
            <loader v-if="loading" />
        </div>
    </form>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from "vue-property-decorator";
    import FormGroup from "@/components/ui/Forms/FormGroup.vue";
    import {ITestimonial, ITestimonialDTO, TestimonialService} from "./../services/testimonial.service";
    import {HashMap} from "./../services/base.service";
    import StarRating from '@/components/ui/StarRating.vue';


    @Component({
        name: "TestimonialForm",
        components: {
            FormGroup,
            StarRating,
        }
    })
    export default class TestimonialForm extends Vue {

        @Prop()
        public id!: string;

        public initialized = false;
        private submission!: ITestimonialDTO;
        private service!: TestimonialService;

        private errors: HashMap<string> = {};

        private submitted = false;

        private rating: number = 0;
        private name: string = "";

        private loading: boolean = false;

        private clear() {
            this.submission = {
                companyName: "",
                name: "",
                email: "",
                rating: 1,
                testimonial: "",
            }
            this.rating = 0;
            this.errors = {};
        }

        private ratingUpdate(i: number) {
            this.submission.rating = i;
        }

        private async created() {
            this.initialized = false;
            this.service = new TestimonialService();
        
            if (this.id) {
                const res = await this.service.getOne(this.id);

                if (res.success) {
                    this.submission = res.result;
                    if (res.result.submitted) {
                        this.$emit('previously-submitted');
                    } else {
                        this.$emit('initialized');
                        this.initialized = true;
                    }
                } else {
                    this.$emit('404');
                }
            } else {
                this.clear();
                this.$emit('initialized');
                this.initialized = true;
            }
        
            
        }

        private async submit() {
            this.loading = true;
            this.errors = {};
            this.submission.rating = this.rating;
            const response = await this.service.submit(this.id, this.submission);
            this.loading = false;
            if (response.success) {
                this.submitted = true;
                this.$emit('success');
            }
            else {
                this.errors = response.error;
            }
        }
    }

</script>