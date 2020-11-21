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

        private ratingUpdate(i) {
            console.log(i);
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
                        alert("Testimonial already submitted! Thank you for your contribution, it is highly appreciated");
                        this.$router.back();
                    }
                    console.log(this.submission);
                } else {
                    alert("Testimonial not found");
                    this.$router.back();
                }
            } else {
                this.clear();
            }
        
            this.initialized = true;
        }

        private async submit() {
            this.submission.rating = this.rating;
            const response = await this.service.submit(this.id, this.submission);
            console.log(response);
            if (response.success) this.submitted = true;
            else this.errors = response.error;

            console.log(this.errors);
        }
    }

</script>