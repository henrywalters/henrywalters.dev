<template>
    <div class="container-fluid">
        <div class="header">
            <h3 class="primary-font text-center">Administration</h3>
            <site-metrics />
            <div class="row mt-3">
                <div class="col-lg-5">
                    <category-manager class="mt-3" />
                    <contact-form-manager class="mt-3" />
                </div>
                <div class="col-lg-7">
                    <service-manager class="mt-3"/>
                    <project-manager class="mt-3"/>
                    <testimonial-manager class="mt-3" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CategoryService, {CategoryDto, ICategory} from "@/services/category.service";
    import CategoryManager from "@/components/CategoryManager.vue";
    import ProjectManager from "@/components/ProjectManager.vue";
    import TestimonialManager from "@/components/TestimonialManager.vue";
    import ContactFormManager from "@/components/ContactFormManager.vue";
    import SiteMetrics from "../components/SiteMetrics.vue";
    import ServiceManager from "@/components/ServiceManager.vue";

    @Component({
        name: "Admin", 
        components: {
            CategoryManager, 
            ProjectManager, 
            TestimonialManager, 
            ContactFormManager,
            SiteMetrics,
            ServiceManager,
        }
    })
    export default class Admin extends Vue {

    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>