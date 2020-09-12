<template>
    <div class="container" ref="container">
        <div class="header">
            <h3 class="primary-font text-center">Projects</h3>
        </div>
        <div class="body" v-if="initialized">
            <div class="card mb-3" v-for="project in projects">
                <div class="card-body">
                    <div class="row">
                        <div v-if="project.thumbnail" class="thumbnail-container col-12 col-md-4 col-lg-3">
                            <img :src="project.thumbnail.cdn" class="thumbnail"/>
                        </div>
                        <div class="col-12 col-md-8 col-lg-9">
                            <div>
                                <h4 class="primary-font m-0 text-center text-md-left">
                                    <a :href="'/projects/' + project.id"
                                       @click.prevent="$router.push({name: 'Project', query: {pid: project.id}})"
                                       class="project-title">{{project.title}}</a>
                                    &nbsp;
                                    <a v-if="project.sourceControlUrl" :href="project.sourceControlUrl"><font-awesome-icon :icon="['fab', 'github']" /></a>
                                </h4>
                                <programming-languages class="m-0 w-100 text-center text-md-left" :languages="project.languages" />
                                <p class="m-0"><b><em>{{project.shortDescription}}</em></b></p>
                                <p v-if="project.url" class="m-0"><b>Demo: </b><a :href="project.url">{{project.url}}</a></p>
                            </div>
                        </div>
                    </div>
                    <p>{{project.longDescription}}</p>
                    <div v-if="project.videoUrl" class="ytplayer_container">
                        <iframe class="ytplayer" :id="'ytplayer_' + project.id" type="text/html" :src="project.videoUrl" frameborder="0" allowfullscreen :width="playerWidth" :height="playerHeight"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Project, ProjectService} from "@/services/project.service";
    import ProgrammingLanguages from "@/components/ui/programmingLanguages.vue";
    import Hagame3d from "@/views/HaGame3D.vue";

    @Component({components: {ProgrammingLanguages, Hagame3d}})
    export default class Projects extends Vue {
        private initialized = false;
        private projects!: Project[];
        private projectService!: ProjectService;
        private playerWidth = 0;
        private playerHeight = 0;

        private async mounted() {
            this.playerWidth = Math.max((this.$refs["container"] as any).clientWidth - 0.20 * document.body.clientWidth, 620);
            this.playerHeight = this.playerWidth * 0.75;
            this.projectService = new ProjectService();
            console.log(this.playerWidth, this.playerHeight);
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

    .ytplayer_container {
        text-align: center;
    }

    .ytplayer {

    }

</style>