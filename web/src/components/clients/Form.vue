<template>
    <form @submit.prevent='submit' v-if='request'>
        <form-group label="Company Name" field='name' :errors='errors'>
            <input class='form-control' type='text' v-model='request.name' />
        </form-group>

        <div class='row'>
            <div class='col-md-12'>
                <form-group label="Phone number" field='phone' :errors='errors'>
                    <vue-tel-input v-model='request.phone' :autoFormat='false' styleClasses='form-control' />
                </form-group>
            </div>
        </div>

        <div class='row'>
            <div class='col-md-6'>
                <form-group label="Rate" field='rate' :errors='errors'>
                    <div class='input-group'>
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type='number' min='0' step='0.01' v-model.number='request.rate' class='form-control'/>
                    </div>
                </form-group>
            </div>
            <div class='col-md-6'>
                <form-group label="Invoice Prefix" field='invoicePrefix' :errors='errors'>
                    <input type='text' v-model='request.invoicePrefix' class='form-control'/>
                </form-group>
            </div>
        </div>

        <form-group label="Contact Name" field='contactName' :errors='errors'>
            <input class='form-control' type='text' v-model='request.contactName' />
        </form-group>

        <form-group label="Contact Email" field='contactEmail' :errors='errors'>
            <div class='input-group'>
                <div class="input-group-prepend">
                    <span class="input-group-text"><font-awesome-icon icon='envelope' /></span>
                </div>
                <input class='form-control' type='text' v-model='request.contactEmail' />
            </div>
        </form-group>

        <button class='btn btn-primary float-right' :disabled='loading' @click='submit'>
            <font-awesome-icon icon='spinner' class='mr-2' spin v-if='loading' />
            <span v-if='editing'>Save Client</span>
            <span v-else>Create Client</span>
        </button>
    </form>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator"
import { Client, ClientCreate, ClientService } from "../../services/accounting.service";
import { ApiResponse, HashMap } from "../../services/base.service";
@Component({
    components: {

    }
})
export default class ClientForm extends Vue {
    @Prop()
    public client!: Client;

    private request!: ClientCreate;

    private api!: ClientService;

    private errors: HashMap<string> = {};

    private loading: boolean = false;

    private error: string | null = null;
    private success: string | null = null;

    private editing: boolean = false;

    created() {
        this.api = new ClientService();
        this.request = {
            name: '',
            contactName: '',
            contactEmail: '',
            rate: 140,
            phone: "",
        }
    }

    @Watch('client')
    public clientChanged() {
        console.log(this.client);
        if (this.client !== null) {
            this.request = this.client;
            this.editing = true;
        } else {
            this.editing = false;
            this.request = {
                name: '',
                contactName: '',
                contactEmail: '',
                rate: 140,
                phone: "",
            }
        }
    }

    public async submit() {
        console.log("SUbmitting", this.request);
        this.errors = {};
        this.loading = true;
        let res: ApiResponse<Client, HashMap<string>>;
        if (this.editing) {
            res = await this.api.put(this.client.id, this.request);
        } else {
            res = await this.api.post(this.request);
        }

        console.log(res);

        if (res.success === true) {
            this.$emit('success', res.result);
        } else {
            this.errors = res.error;
        }
        this.loading = false;
    }
}
</script>