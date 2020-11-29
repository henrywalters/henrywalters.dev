<template>
    <div class="container">
        <div class="body">
            <loader v-if="state == States.LOADING" :loading="true" />
            <testimonial-form 
                v-show="state == States.INITIALIZED"
                :id="$route.params.id" 
                v-on:initialized="state = States.INITIALIZED; $forceUpdate()"
                @404="state = States.NOT_FOUND; $forceUpdate()" 
                @previously-submitted="state = States.PREVIOUSLY_SUBMITTED; $forceUpdate()" 
                @success="state = States.SUCCESS; $forceUpdate()" 
            />
            <div v-if="state == States.NOT_FOUND" class="text-center mt-4">
                <h5 class="primary-font">Testimonial Not Found</h5>
                <p class="text-center">This testimonial link is invalid. :/</p>
            </div>
            <div v-if="state == States.PREVIOUSLY_SUBMITTED" class="text-center mt-4">
                <h5 class="primary-font">Testimonial Already Submitted!</h5>
                <p class="text-center">Thank you for submitting a testimonial. Your business is highly appreciated.</p>
            </div>
            <div v-if="state == States.SUCCESS" class="text-center mt-4">
                <h5 class="primary-font">Testimonial Submitted!</h5>
                <p class="text-center">Thank you for submitting a testimonial. Your business is highly appreciated. We look forward to serving you again.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import TestimonialForm from '@/components/TestimonialForm.vue'

    enum State {
        LOADING,
        INITIALIZED,
        NOT_FOUND,
        PREVIOUSLY_SUBMITTED,
        SUCCESS,
    }

    @Component({name: "Testimonial", components: {TestimonialForm}})
    export default class Testimonial extends Vue {

        private state!: State;

        private get States() { return State }

        private created() {
            this.state = this.States.LOADING;
        }

        private initialize() {
            this.state = this.States.INITIALIZED;
            this.$forceUpdate();
        }
    }
</script>