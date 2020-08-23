<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Projects</h3>
        </div>
        <div class="body" v-if="initialized">
            <div class="card mb-3" v-for="project in projects">
                <div class="card-body">
                    <div class="w-100 d-inline-flex">
                        <div v-if="project.thumbnail" class="thumbnail-container mr-2">
                            <img :src="project.thumbnail.cdn" class="thumbnail"/>
                        </div>
                        <div class="d-block">
                            <div>
                                <h4 class="primary-font m-0">
                                    <a :href="'/projects/' + project.id" @click.prevent="$router.push({name: 'Project', query: {pid: project.id}})" class="project-title">{{project.title}}</a>
                                    &nbsp;
                                    <a v-if="project.sourceControlUrl" :href="project.sourceControlUrl"><font-awesome-icon :icon="['fab', 'github']" /></a>
                                </h4>
                                <programming-languages class="m-0" :languages="project.languages" />
                                <p class="m-0"><b><em>{{project.shortDescription}}</em></b></p>
                                <p v-if="project.url" class="m-0"><b>Demo: </b><a :href="project.url">{{project.url}}</a></p>
                            </div>
                        </div>
                    </div>
                    <p>{{project.longDescription}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Project, ProjectService} from "@/services/project.service";
    import ProgrammingLanguages from "@/components/ui/programmingLanguages.vue";

    @Component({components: {ProgrammingLanguages}})
    export default class Projects extends Vue {
        private initialized = false;
        private projects!: Project[];
        private projectService!: ProjectService;

        private async mounted() {
            this.projectService = new ProjectService();
            const res = await this.projectService.get();
            if (res.success) this.projects = res.result;
            console.log(this.projects);
            this.initialized = true;
        }
    }
</script>

<style scoped lang="scss">
    .project-title {
        color: black;
    }
</style>