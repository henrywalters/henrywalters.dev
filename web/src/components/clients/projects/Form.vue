<template>
    <form @submit.prevent='submit'>
        
        <div class='row'>
            <div class='col-12'>
                <form-group label="Client" field='clientId' :errors='errors'>
                    <select v-model='request.clientId' class='form-control' >
                        <option v-for='(client, idx) in clients' :key='idx' :value='client.id'>
                            {{client.name}}
                        </option>
                    </select>
                </form-group>
            </div>
        </div>

        <div class='row'>
            <div class='col-md-8'>
                <form-group label="Project Title" field='title' :errors='errors'>
                    <input type='text' class='form-control' v-model='request.title' />
                </form-group>
            </div>
            <div class='col-md-4'>
                <form-group label="Project Status" field='status' :errors='errors'>
                    <select v-model='request.status' class='form-control'>
                        <option v-for='(status, idx) in statuses' :key='idx'>{{status}}</option>
                    </select>
                </form-group>
            </div>
        </div>
        
        <div class='row'>
            <div class='col-12'>
                <div class='btn-group float-right'>
                    <button class='btn btn-warning float-right' @click.prevent='$emit("cancel")' :disabled='loading' v-if='editing'>
                        Cancel
                    </button>
                    <button class='btn btn-primary' @click='submit' :disabled='loading'>
                        <font-awesome-icon icon='spinner' spin class='mr-2' v-if='loading' />
                        <span v-if='editing'>Save Project</span>
                        <span v-else>Create Project</span>
                    </button>
                </div>
            </div>
        </div>

        
    </form>
</template>

<script lang='ts'>
    
import {Vue, Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import { Client, ClientProject, ClientProjectCreate, ClientProjectStatus, ClientService, CLIENT_PROJECT_STATUS_NAMES } from '../../../services/accounting.service';
import { FormMixin } from './../../../mixins/FormMixin'

@Component({})
export default class ClientProjectForm extends Mixins<FormMixin<ClientProjectCreate, ClientProject>>(FormMixin) {

    clients: Client[] = [];
    clientsApi: ClientService = new ClientService();

    empty: ClientProjectCreate = {
        title: '',
        status: ClientProjectStatus.LEAD,
        clientId: '',
    }

    created() {
        this.refreshClients();
    }

    async refreshClients() {
        const res = await this.clientsApi.get();
        if (res.success) {
            this.clients = res.result;
        }
    }

    objToDto = (obj: ClientProject) => {
        return {
            title: obj.title,
            status: obj.status,
            clientId: obj.client.id,
        }
    }

    idFn = (obj: ClientProject) => {
        return obj.id;
    }

    get statuses() {
        return CLIENT_PROJECT_STATUS_NAMES;
    }
}

</script>

<style lang="scss" scoped>

</style>