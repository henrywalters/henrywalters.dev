<template>
    <div class='container-fluid'>
        <modal title="New Project" :isOpen='formOpen' @close='cancelEdit'>

        </modal>
        <h2>Projects <button class='btn btn-primary btn-sm float-right' @click='create'><font-awesome-icon icon='plus' /> Create</button></h2>
        <client-projects-list :projects='projects' />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins} from "vue-property-decorator";
import { ClientProject, ClientProjectService } from "../../../services/accounting.service";
import ClientProjectsList from "./List.vue"

@Component({
    components: {
        ClientProjectsList,
    }
})
export default class ClientProjectsIndex extends Vue {
    
    formOpen: boolean = false;
    addressFormOpen: boolean = false;
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
        this.editing = null;
    }

    async create() {
        this.formOpen = true;
        this.editing = null;
    }
}
</script>

<style scoped lang="scss">

</style>