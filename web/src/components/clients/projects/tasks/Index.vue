<template>
    <div class='container-fluid' v-if='initialized' >
        <h5>New Task</h5>
        <div class='row mb-3'>
            <div class='col-12'>
                <client-project-task-form :api='api' @success='success' />
            </div>
        </div>
        

        <loader v-if='loading && !initialized' />
        <div class='table-responsive' v-else-if='tasks.length > 0'>
            <table class='table'>
                <thead>
                    <th></th>
                    <th>Task Details</th>
                    <th>Accounting</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for='(task, idx) in tasks' :key='idx'>
                        <td><font-awesome-icon icon='check' v-if='task.complete' class='text-success fa-2x' /></td>
                        <td v-if='isEditing(task)' colspan='2'>
                            <client-project-task-form :object='editing[task.id]' :api='api' @success='saveSuccess' @cancel='cancelEditTask(task)' />
                        </td>
                        <td v-if='!isEditing(task)'>
                            <p class='m-0'><b>{{task.title}}</b></p>
                            <p class='m-0' v-if='task.description'><markdown-viewer ref='desc' :value='task.description' /></p>
                        </td>
                        <td v-if='isLogging(task)' colspan='1'>
                            <log-hours-form :project='project' :task='logging[task.id]' @cancel='cancelLog(task)' @success='logSuccess(task)' />
                        </td>
                        <td v-if='!isEditing(task) && !isLogging(task)'>
                            <table class='table table-sm'>
                                <tbody>
                                    <tr>
                                        <td><b>Est Hours</b></td>
                                        <td>{{task.estimatedHours}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Act Hours</b></td>
                                        <td>{{task.actualHours}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Billed Hours</b></td>
                                        <td>{{task.billedHours}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <div class='btn-group'>
                                <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='Log time' @click='log(task)' :disabled='task.complete'>
                                    <font-awesome-icon icon='clock' />
                                </button>
                                <button class='btn btn-sm btn-warning' data-toggle='tooltip' title='Edit task' @click='edit(task)'>
                                    <font-awesome-icon icon='pencil-alt' />
                                </button>
                                <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove task' @click='remove(task)'>
                                    <font-awesome-icon icon='trash' />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5 v-else>No tasks yet</h5>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins, Prop, Watch} from "vue-property-decorator";
import { ClientProject, ClientProjectService, ClientProjectTask, ClientProjectTaskService } from "../../../../services/accounting.service";
import ClientProjectTaskList from "./List.vue"
import ClientProjectTaskForm from "./Form.vue"
import LogHoursForm from './LogHoursForm.vue'

@Component({
    components: {
        ClientProjectTaskList,
        ClientProjectTaskForm,
        LogHoursForm,
    }
})
export default class ClientProjectsIndex extends Vue {

    @Prop()
    public project!: ClientProject;

    initialized: boolean = false;
    
    formOpen: boolean = false;
    addressFormOpen: boolean = false;
    editing: {[key: string]: ClientProjectTask} = {};
    logging: {[key: string]: ClientProjectTask} = {};
    tasks: ClientProjectTask[] = [];

    api!: ClientProjectTaskService;

    loading = false;

    async created() {
        this.api = new ClientProjectTaskService('');
        this.initialized = true;
        await this.refresh();
    }

    @Watch('project', {deep: true})
    public async projectChange() {
        if (this.project) this.api = new ClientProjectTaskService(this.project.id);
        await this.refresh();
    }

    async refresh() {
        this.loading = true;
        const res = await this.api.get();
        if (res.success) {
            this.tasks= res.result;
            for (const task of this.tasks) {
                if (task.id in this.editing) {
                    this.editing[task.id] = task;
                }
            }
        }
        this.loading = false;
    }

    isEditing(task: ClientProjectTask) {
        return task.id in this.editing;
    }

    isLogging(task: ClientProjectTask) {
        return task.id in this.logging;
    }

    log(task: ClientProjectTask) {
        this.logging[task.id] = task;
        this.$forceUpdate();
    }

    cancelLog(task: ClientProjectTask) {
        delete this.logging[task.id];
        this.$forceUpdate();
    }

    async logSuccess(task: ClientProjectTask) {
        delete this.logging[task.id];
        await this.refresh();
        this.$emit('update');
        this.$forceUpdate();
    }

    cancelEdit() {
        this.formOpen = false;
    }

    cancelEditTask(task: ClientProjectTask) {
        delete this.editing[task.id];
        this.$forceUpdate();
    }

    async create() {
        this.formOpen = true;
    }

    async edit(project: ClientProjectTask) {
        this.editing[project.id] = project;
        this.$forceUpdate();
    }

    async remove(project: ClientProjectTask) {
        await this.api.delete(project.id);
        await this.refresh();
    }

    async saveSuccess(task: ClientProjectTask) {
        delete this.editing[task.id];
        await this.refresh();
        this.$emit('update');
    }

    async success() {
        this.formOpen = false;
        await this.refresh();
    }
}
</script>

<style scoped lang="scss">

</style>