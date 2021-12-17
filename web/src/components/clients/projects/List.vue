<template>
    <div class='table-responsive'>
        <table class='table'>
            <thead>
                <th>Client</th>
                <th>Title</th>
                <th>Status</th>
                <th>Est. Hours</th>
                <th>Act. Hours</th>
                <th>Billed</th>
                <th>Manage</th>
                <th>Accounting</th>
            </thead>
            <tbody>
                <tr v-for='(project, idx) in projects' :key='idx'>
                    <td><b>{{project.client.name}}</b></td>
                    <td>{{project.title}}</td>
                    <td>{{project.status}}</td>
                    <td>{{estHours(project)}}</td>
                    <td>{{actHours(project)}}</td>
                    <td>{{billedHours(project)}}</td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='Work on tasks' @click='$emit("edit-tasks", project)'>
                                <font-awesome-icon icon='tasks' />
                            </button>
                            <button class='btn btn-sm btn-warning' data-toggle='tooltip' title='Edit project' @click='$emit("edit", project)'>
                                <font-awesome-icon icon='pencil-alt' />
                            </button>
                            <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove project' @click='$emit("remove", project)'>
                                <font-awesome-icon icon='trash' />
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='Create quote' @click='$emit("quote", project)'>
                                <font-awesome-icon icon='quote-right' />
                            </button>
                            <button class='btn btn-sm btn-success' data-toggle='tooltip' title='Create invoice' @click='$emit("invoice", project)'>
                                <font-awesome-icon icon='file-invoice-dollar' />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';
import { ClientProject } from '../../../services/accounting.service';

@Component({})
export default class ClientProjectsList extends Vue {
    @Prop()
    public projects!: ClientProject[];

    public estHours(project: ClientProject) {
        let sum = 0;
        for (const task of project.tasks) {
            sum += task.estimatedHours;
        }
        return sum;
    }

    public actHours(project: ClientProject) {
        let sum = 0;
        for (const task of project.tasks) {
            sum += task.actualHours;
        }
        return sum;
    }

    public billedHours(project: ClientProject) {
        let sum = 0;
        for (const task of project.tasks) {
            sum += task.billedHours;
        }
        return sum;
    }
}

</script>

<style lang="scss" scoped>

</style>