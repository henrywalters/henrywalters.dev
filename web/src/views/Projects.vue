<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Projects</h3>
        </div>
        <div class="body" v-if="initialized">
            <div class="card mb-3" v-for="project in projects">
                <div class="card-body">
                    <h4 class="primary-font">
                        {{project.title}}
                        <a v-if="project.sourceControlUrl" :href="project.sourceControlUrl"><font-awesome-icon :icon="['fab', 'github']" /></a>
                    </h4>
                    <b><em>{{project.shortDescription}}</em> <span v-for="language in project.languages" class="badge" :class="badgeColor(language)">{{language}}</span></b>
                    <p>{{project.longDescription}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Project, ProjectService} from "@/services/project.service";

    @Component({})
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

        private badgeColor(language: string): string {
            switch (language) {
                case 'Typescript': return 'badge-primary';
                case 'C++': return 'badge-success';
                default: return 'badge-dark';
            }
        }
    }
</script>