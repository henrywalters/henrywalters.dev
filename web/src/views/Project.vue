<template>
    <div class="container" v-if="initialized">
        <div class="header">
            <h3 class="primary-font text-center" v-if="viewing">
                {{project.title}}
                &nbsp;
                <a v-if="project.sourceControlUrl" :href="project.sourceControlUrl"><font-awesome-icon :icon="['fab', 'github']" /></a>

            </h3>
        </div>
        <div class="view-body" v-if="viewing">
            <p class="text-center">
                <b><em>{{project.shortDescription}}</em></b>
                <programming-languages class="ml-2" :languages="project.languages" />
            </p>
            <p>{{project.longDescription}}</p>
        </div>
        <div class="body" v-else>
            <form @submit.prevent v-if="initialized">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Project Title:</label>
                        <input type="text" class="form-control" v-model="project.title" />
                    </div>
                    <div class="col-lg-6">
                        <label>Project Status:</label>
                        <select v-model="project.status" class="form-control">
                            <option>In Development</option>
                            <option>Live</option>
                            <option>Deprecated</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-3">
                        <label>Languages:</label>
                        <input type="text" class="form-control" v-model="newLanguage" />
                    </div>
                    <div class="col-lg-1">
                        <button class="btn btn-primary" @click="project.languages.push(newLanguage); newLanguage = ''" style="margin-top: 30px;">Add</button>
                    </div>
                    <div class="col-lg-8">
                        <span class="badge" v-for="language in project.languages"  style="margin-top: 40px;">{{language}} <a href="#" style="color: red" @click="removeLanguage(language)">X</a></span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Short Description:</label>
                    <input type="text" class="form-control" v-model="project.shortDescription" />
                </div>
                <div class="form-group">
                    <label>Long Description:</label>
                    <textarea class="form-control" v-model="project.longDescription"></textarea>
                </div>
                <div class="form-group row">
                    <div class="col-lg-4">
                        <label>Url:</label>
                        <input type="text" class="form-control" v-model="project.url" />
                    </div>
                    <div class="col-lg-4">
                        <label>Source Control Url:</label>
                        <input type="text" class="form-control" v-model="project.sourceControlUrl" />
                    </div>
                    <div class="col-lg-4">
                        <label>Video Url:</label>
                        <input type="text" class="form-control" v-model="project.videoUrl" />
                    </div>
                </div>
                <div class="form-group">
                    <label>Project Thumbnail:</label>
                    <div class="card">
                        <div class="card-body">
                            <image-uploader v-model="thumbnail" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary form-control" @click="submit">Submit</button>
                </div>
                <transition name="fade">
                    <div class="form-group" v-if="success">
                        <p class="alert-success p-1 text-center">{{success}}</p>
                    </div>
                    <div class="form-group" v-if="error">
                        <p class="alert-danger p-1 text-center">Failed to save Project</p>
                    </div>
                </transition>

            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Project, ProjectDto, ProjectService} from "@/services/project.service";
    import ProgrammingLanguages from "@/components/ui/programmingLanguages.vue";
    import ImageUploader from "@/components/ui/ImageUploader.vue";
    import {UserFile} from "@/services/userFile.service";
    import {HashMap} from "@/services/base.service";

    enum ProjectMode {
        New,
        Edit,
        View,
    }

    @Component({components: {ImageUploader, ProgrammingLanguages}})
    export default class Projects extends Vue {
        private initialized = false;
        private project!: Project | ProjectDto;
        private projectService!: ProjectService;
        private mode!: ProjectMode;

        private success: string | null = null;
        private errors: HashMap<string> = {};
        private error = false;

        private newLanguage: string = "";

        private thumbnail!: UserFile;

        private async mounted() {
            this.projectService = new ProjectService();

            switch(this.$route.query.mode) {
                case 'new':
                    this.mode = ProjectMode.New;
                    break;
                case 'edit':
                    this.mode = ProjectMode.Edit;
                    break;
                default:
                    this.mode = ProjectMode.View;
            }

            if (this.mode !== ProjectMode.New) {
                const res = await this.projectService.getOne(this.$route.query.pid as string);
                if (res.success) {
                    this.project = res.result;
                    const thumbnail = (this.project as Project).thumbnail;
                    if (thumbnail ) {
                        this.thumbnail = thumbnail;
                    }
                }
                else {
                    alert("Project does not exist");
                    this.$router.back();
                }
            } else {
                this.project = {
                    title: "",
                    shortDescription: "",
                    longDescription: "",
                    url: "",
                    sourceControlUrl: "",
                    videoUrl: "",
                    status: "",
                    languages: [],
                    thumbnailId: "",
                }
            }
            this.initialized = true;
        }

        private badgeColor(language: string): string {
            switch (language) {
                case 'Typescript': return 'badge-primary';
                case 'C++': return 'badge-success';
                case 'HTML': return 'badge-'
                default: return 'badge-dark';
            }
        }

        private get viewing(): boolean {
            return this.mode === ProjectMode.View;
        }

        private removeLanguage(lang: string) {
            this.project.languages.splice(this.project.languages.indexOf(lang), 1);
            this.$forceUpdate();
        }

        private async submit() {

            const project = this.project as ProjectDto;

            if (this.thumbnail) project.thumbnailId = this.thumbnail.id;
            this.error = false;
            this.errors = {};

            if (this.mode === ProjectMode.Edit) {
                const res = await this.projectService.put(this.$route.query.pid as string, project);
                if (res.success) {
                    this.success = "Project Updated Successfully";
                    this.project = res.result;
                    setTimeout(() => {
                        this.success = null;
                    }, 2000);
                } else {
                    this.errors = res.error;
                    this.error = true;
                }
            } else if (this.mode === ProjectMode.New) {
                const res = await this.projectService.post(project);
                if (res.success) {
                    this.success = "Project Created Successfully";
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>