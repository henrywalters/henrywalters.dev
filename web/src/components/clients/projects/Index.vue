<template>
    <div class='container-fluid'>
        <modal title="New Project" :isOpen='formOpen' @close='cancelEdit'>
            <client-projects-form :object='editing' :api='api' @success='success' />
        </modal>
        <modal :title="`${editing === null ? 'Project' : editing.title} Tasks`" :isOpen='taskFormOpen' @close='cancelEdit' size='lg'>
            <client-project-tasks :project='editing' @update='refresh' />
        </modal>
        <h2>Projects <button class='btn btn-primary btn-sm float-right' @click='create'><font-awesome-icon icon='plus' /> Create</button></h2>
        <client-projects-list :projects='projects' @edit='edit' @remove='remove' @edit-tasks='editTasks' />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins} from "vue-property-decorator";
import { ClientProject, ClientProjectService } from "../../../services/accounting.service";
import ClientProjectsList from "./List.vue"
import ClientProjectsForm from "./Form.vue"
import ClientProjectTasks from "./tasks/Index.vue"

@Component({
    components: {
        ClientProjectsList,
        ClientProjectsForm,
        ClientProjectTasks,
    }
})
export default class ClientProjectsIndex extends Vue {
    
    formOpen: boolean = false;
    taskFormOpen: boolean = false;
    editing: ClientProject | null = null;
    projects: ClientProject[] = [];

    api!: ClientProjectService;

    async created() {
        this.api = new ClientProjectService();
        await this.refresh();
    }

    async refresh() {
        const res = await this.api.get();
        if (res.success) {
            this.projects = res.result;
            if (this.editing) {
                for (const project of this.projects) {
                    if (project.id === this.editing.id) {
                        this.editing = project;
                    }
                }
            }
            
        }
    }

    cancelEdit() {
        this.formOpen = false;
        this.taskFormOpen = false;
        this.editing = null;
    }

    async create() {
        this.formOpen = true;
        this.editing = null;
    }

    async edit(project: ClientProject) {
        this.formOpen = true;
        this.editing = project;
    }

    editTasks(project: ClientProject) {
        this.taskFormOpen = true;
        this.editing = project;
    }

    async remove(project: ClientProject) {
        await this.api.delete(project.id);
        await this.refresh();
    }

    async success() {
        this.formOpen = false;
        this.editing = null;
        await this.refresh();
    }
}
</script>

<style scoped lang="scss">

</style>