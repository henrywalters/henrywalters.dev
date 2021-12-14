<template>
    <div class='table-responsive'>
        <table class='table'>
            <thead>
                <th>Task Details</th>
                <th>Completed?</th>
                <th>Est. Hours</th>
                <th>Act. Hours</th>
                <th>Billed hours</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for='(task, idx) in tasks' :key='idx'>
                    <td>
                        <p><b>{{task.title}}</b></p>
                        <p v-if='task.description'>{{task.description}}</p>
                    </td>
                    <th><font-awesome-icon icon='check' v-if='complete' class='text-success' /></th>
                    <td>{{task.estimatedHours}}</td>
                    <td>{{task.actualHours}}</td>
                    <td>{{task.billedHours}}</td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-warning' data-toggle='tooltip' title='Edit task' @click='$emit("edit", task)'>
                                <font-awesome-icon icon='pencil-alt' />
                            </button>
                            <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove task' @click='$emit("remove", task)'>
                                <font-awesome-icon icon='trash' />
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
import { ClientProjectTask } from '../../../../services/accounting.service';

@Component({})
export default class ClientProjectsList extends Vue {
    @Prop()
    public tasks!: ClientProjectTask[];
}

</script>

<style lang="scss" scoped>

</style>