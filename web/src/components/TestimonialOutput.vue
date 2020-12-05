<template>
    <div class='testimonial-container mt-4'>
        <h1 class='primary-font text-center'>Client Testimonials</h1>
        <div class="testimonials d-inline-flex w-100 row">
            <div class="testimonial" v-for="(item, i) in list" :key="i" :class="{bordered: i !== 0 && i !== list.length - 1}">
                <div v-if="item.anonymous">
                    <b>Anonymous</b>
                </div>
                <div v-else>
                    <b>{{item.name}}</b>
                    <br />
                    <i>{{item.companyName}}</i>
                </div>
                <p class='content pt-3 pb-3 m-0'><b><span class='quote'>"</span></b>{{item.testimonial}}<b><span class='quote'>"</span></b></p>
                <star-rating v-model="item.rating" :read-only="true" size="1x" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import {ITestimonial, ITestimonialDTO, TestimonialService} from "./../services/testimonial.service";
    import StarRating from "@/components/ui/StarRating.vue";

    @Component({
        components: {
            StarRating,
        }
    })
    export default class TestimonialOutput extends Vue{
        private service!: TestimonialService;
        private list: ITestimonial[] = [];

        private async getList() {
            const res = await this.service.getSubmitted();
            if (res.success) this.list = res.result;
        }

        private async created() {
            this.service = new TestimonialService();
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    .testimonials {
        display: inline-flex;
        justify-content: space-evenly;
    }

    .testimonial {
        word-wrap: break-word;
        min-width: 350px;
        width: 350px;
        padding: 30px;

        .content {
            font-size: 18px;
        }

        margin-top: 15px;
    }

    .quote {
        font-size: 18px;
    }
    
</style>