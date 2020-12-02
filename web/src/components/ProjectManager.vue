<template>
    <card-collapsible title="Projects">
        <div class="row">
            <div class="col-12">
                <button class="btn btn-primary form-control" @click="$router.push({name: 'Project', query: {mode: 'new'}})">New Project</button>
            </div>
            <div class="col-12 mt-2">
                <ul class="list-group" v-if="initialized">
                    <li class="list-group-item" v-for="project in projects">
                        <div class="row">
                            <div class="col-8">
                                <b><a class="link-black" :href="'/projects/' + project.id" @click.prevent="$router.push({name: 'Project', query: {pid: project.id}})">{{project.title}}</a></b> - {{project.shortDescription}}
                            </div>
                            <div class="col-4  btn-group btn-group-sm" style="height: 31px">
                                <button class="btn btn-sm btn-info" @click="$router.push({name: 'Project', query: {mode: 'edit', pid: project.id}})">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteProject(project.id)">Delete</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </card-collapsible>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CategoryService, {CategoryDto, ICategory} from "@/services/category.service";
    import ImageUploader from "@/components/ui/ImageUploader.vue";
    import {Project, ProjectService} from "@/services/project.service";
    import CardCollapsible from "@/components/ui/CardCollapsible.vue";

    @Component({name: "ProjectManager", components: {ImageUploader, CardCollapsible}})
    export default class ProjectManager extends Vue {
        private initialized = false;
        private projects!: Project[];
        private projectService!: ProjectService;

        private async mounted () {
            this.projectService = new ProjectService();
            await this.refresh();
            this.initialized = true;
        }

        private async refresh() {
            const res = await this.projectService.get();
            if (res.success) this.projects = res.result;
            else this.projects = [];
        }

        private async deleteProject(projectId: string) {
            await this.projectService.delete(projectId);
            await this.refresh();
            this.$forceUpdate();
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>