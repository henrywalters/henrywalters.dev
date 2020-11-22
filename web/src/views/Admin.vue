<template>
    <div class="container-fluid">
        <div class="header">
            <h3 class="primary-font text-center">Administration</h3>
            <div class="row">
                <div class="col-lg-4">
                    <category-manager />
                </div>
                <div class="col-lg-8">
                    <project-manager />
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

    @Component({name: "Admin", components: {CategoryManager, ProjectManager, TestimonialManager}})
    export default class Admin extends Vue {

    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>