<template> 
    <div>
        <div class="banner-container">
            <div class="banner text-center">
                Call us at <a :href="'tel:' + getConfig('PHONE')">{{getConfig('PHONE')}}</a> or send an email to <a :href="'mailto:' + getConfig('EMAIL')">{{getConfig('EMAIL')}}</a>
            </div>
        </div>
        <div class="container">
            <service-output class="mt-4"/>
            <testimonial-output class="mt-5" />
            <div class='row'>
                <div class='col-md-2 col-lg-3'></div>
                <div class='card mt-5 col-md-8 col-lg-6 col-12'>
                    <div class='card-body'>
                        <h1 class='primary-font text-center'>Reach Out To Us</h1>
                        <p>Send us a message briefly explaining your project and we'll reach out within 24 hours!</p>
                        <contact-form />
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";
    import TestimonialOutput from "@/components/TestimonialOutput.vue";
    import ServiceOutput from "@/components/ServiceOutput.vue";
    import ContactForm from "@/components/ContactForm.vue";

    @Component({
        name: "Home",
        components: {
            TestimonialOutput,
            ServiceOutput,
            ContactForm
        }
    })
    export default class Home extends Mixins(ConfigMixin) {
        private initialized = true;
    }
</script>

<style scoped lang="scss">

.banner-container {
    display: table;
    width: 100%;
    height: 40px;
    background-color: #007bff;
}

.banner {
    padding: 10px;
    position: relative;
    display: table-cell;

    font-size: 24px;

    text-align: center;

    a {
        color: white;
    }
    
    color: white;
    
}
</style>