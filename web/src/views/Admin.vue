<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Administration</h3>
            <div class="row">
                <div class="col-lg-5">
                    <category-manager />
                </div>
                <div class="col-lg-7">
                    <project-manager />
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

    @Component({name: "Admin", components: {CategoryManager, ProjectManager}})
    export default class Admin extends Vue {

    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>