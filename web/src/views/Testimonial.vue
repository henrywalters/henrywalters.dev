<template>
    <div class="container">
        <div class="body">
            <testimonial-form :id="$route.params.id" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TestimonialForm from '@/components/TestimonialForm.vue'

    @Component({name: "Testimonial", components: {TestimonialForm}})
    export default class Testimonial extends Vue {
        private created() {
            console.log("Testimonial created", this.$route.params.id);
        }
    }
</script>