<template>
    <form @submit.prevent='submit'>
        
        <div class='row'>
            <div class='col-9'>
                <form-group label="Task Title" field='title' :errors='errors'>
                    <input class='form-control' type='text' v-model='request.title' />
                </form-group>
            </div>
            <div class='col-3'>
                <form-group label="Estimated Hours" field='title' :errors='errors'>
                    <input class='form-control' type='number' min='0' step='0.125' v-model.number='request.estimatedHours' />
                </form-group>
            </div>
        </div>

        <div class='row'>
            <div class='col-md-12'>
                <form-group label="Project Description" field='description' :errors='errors'>
                    <markdown-editor v-model='request.description' :height='200' />
                </form-group>
            </div>
        </div>
        
        <div class='row' v-if='editing'>
            <div class='col-12'>
                <div class='custom-control custom-switch mb-2 float-right'>
                    <input type='checkbox' class='custom-control-input' :id='`completeSwitch-${id}`' v-model='request.complete'>
                    <label class='custom-control-label' :for='`completeSwitch-${id}`'> Task Complete?</label>
                </div>
            </div>
        </div>
        
        <div class='row mt-2'>
            <div class='col-12'>
                <div class='btn-group float-right'>
                    <button class='btn btn-warning float-right' @click.prevent='$emit("cancel")' :disabled='loading' v-if='editing'>
                        Cancel
                    </button>
                    <button class='btn btn-primary' @click='submit' :disabled='loading'>
                        <font-awesome-icon icon='spinner' spin class='mr-2' v-if='loading' />
                        <span v-if='editing'>Save Task</span>
                        <span v-else>Create Task</span>
                    </button>
                </div>
            </div>
        </div>

        
    </form>
</template>

<script lang='ts'>
    
import {Vue, Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import { ClientProjectTask, ClientProjectTaskCreate } from '../../../../services/accounting.service';
import { FormMixin } from './../../../../mixins/FormMixin'
import {Random} from 'hcore/dist/random';

@Component({})
export default class ClientProjectTaskForm extends Mixins<FormMixin<ClientProjectTaskCreate, ClientProjectTask>>(FormMixin) {

    id!: string;

    created() {
        this.id = Random.alphanumeric(10);
    }

    empty: ClientProjectTaskCreate = Object.freeze({
        title: '',
        description: '',
        estimatedHours: 0,
        complete: false,
    });

    objToDto = (obj: ClientProjectTask) => {
        return {
            title: obj.title,
            description: obj.description,
            estimatedHours: obj.estimatedHours,
            complete: obj.complete,
        }
    }

    idFn = (obj: ClientProjectTask) => {
        return obj.id;
    }
}

</script>

<style lang="scss" scoped>

</style>