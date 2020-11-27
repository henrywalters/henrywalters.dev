<template>
    <div class="container-fluid" v-if="authorized">
        <div class="header">
            <h3 class="primary-font text-center">Administration</h3>
        </div>
        <div class="body">
            <site-metrics />
            <div class="row mt-3">
                <div class="col-lg-5">
                    <category-manager />
                    <contact-form-manager class="mt-3" />
                </div>
                <div class="col-lg-7">
                    <project-manager />
                    <testimonial-manager class="mt-3" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Vue} from "vue-property-decorator";
    import CategoryService, {CategoryDto, ICategory} from "@/services/category.service";
    import CategoryManager from "@/components/CategoryManager.vue";
    import ProjectManager from "@/components/ProjectManager.vue";
    import TestimonialManager from "@/components/TestimonialManager.vue";
    import ContactFormManager from "@/components/ContactFormManager.vue";
    import SiteMetrics from "../components/SiteMetrics.vue";
    import AuthMixin from "../mixins/AuthMixin";

    @Component({
        name: "Admin", 
        components: {
            CategoryManager, 
            ProjectManager, 
            TestimonialManager, 
            ContactFormManager,
            SiteMetrics,
        }
    })
    export default class Admin extends Mixins(AuthMixin) {
        private async created() {
            console.log(this);
            await this.authorizeFor('ADMIN');
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>