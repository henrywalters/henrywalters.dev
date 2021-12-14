<template>
    <div class='container-fluid' v-if='api'>

        <div class='row' v-if='initialized'>
            <div class='col-md-6'>
                <h5>
                    <font-awesome-icon icon='money-bill-wave' class='mr-2' />
                    Billing Address
                </h5>
                <div class='form-group'>
                    <select class='form-control' v-model='billingAddressId'>
                        <option :value='null' />
                        <option v-for='(addr, idx) in addresses' :value='addr.id' :key='idx'><address-display :address='addr' type='full-inline' /></option>
                    </select>
                </div>
            </div>
            <div class='col-md-6'>
                <h5>
                    <font-awesome-icon icon='truck' class='mr-2' />
                    Shipping Address
                </h5>
                <div class='custom-control custom-switch mb-2'>
                    <input type='checkbox' class='custom-control-input' id='shippingSwitch' @change='updateShipping' v-model='shippingAddressSame'>
                    <label class='custom-control-label' for='shippingSwitch'> Shipping same as billing?</label>
                </div>
                <div class='form-group mt-2' v-if='!shippingAddressSame'>
                    
                    <select class='form-control' v-model='shippingAddressId'>
                        <option :value='null' />
                        <option v-for='(addr, idx) in addresses' :value='addr.id' :key='idx'><address-display :address='addr' type='full-inline' /></option>
                    </select>
                </div>
            </div>
        </div>
        <div class='row'>
            <div class='col-12'>
                <button class='btn btn-success float-right' :disabled='loading' @click='submit'>
                    <font-awesome-icon icon='spinner' spin v-if='loading' />
                    Save Client Addresses
                </button>
            </div>
        </div>
        <hr />
        <div class='mt-3'>
            <h5>New Address</h5>
            <address-form :api='api' @success='newAddress'/>
        </div>

        <hr />

        <ul class='list-group'>
            <li class='list-group-item' v-for='(addr, idx) in addresses' :key='idx'>
                <div class='row'>
                    <div class='col-2'>
                        <font-awesome-icon v-if='client.billingAddress && client.billingAddress.id === addr.id' icon='money-bill-wave' class='mr-2' />
                        <font-awesome-icon v-if='client.shippingAddress && client.shippingAddress.id === addr.id' icon='truck' class='mr-2' />
                    </div>
                    <div class='col-8'>
                        <address-display :address='addr' type='full-inline' v-if='!editing[addr.id]' />
                        <address-form :object='editing[addr.id]' @success='addressUpdate(addr)' @cancel='cancelEdit(addr)' :api='api' v-if='editing[addr.id]' />
                    </div>
                    <div class='col-2'>
                        <div class='btn-group float-right'>
                            <button class='btn btn-sm btn-warning' @click='edit(addr)'>
                                <font-awesome-icon icon='pencil-alt' />
                            </button>
                            <button class='btn btn-sm btn-danger' @click='remove(addr)'>
                                <font-awesome-icon icon='trash' />
                            </button>
                        </div>
                    </div>
                </div>
                
                
                
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { Address, AddressCreate, Client, ClientAddresses, ClientAddressService, ClientService } from '../../services/accounting.service';
import { HashMap } from '../../services/base.service';
import AddressDisplay from './../ui/AddressDisplay.vue'
import AddressForm from './AddressForm.vue'

@Component({
    components: {
        AddressDisplay,
        AddressForm,
    }
})
export default class ClientAddressesForm extends Vue {
    @Prop()
    public client!: Client;

    private clientApi: ClientService = new ClientService();
    private api: ClientAddressService = new ClientAddressService('');

    private addresses: Address[] = [];

    private loading: boolean = false;

    private billingAddressId?: string;
    private shippingAddressSame: boolean = false;
    private shippingAddressId?: string;

    private initialized = false;


    private editing: {[key: string]: AddressCreate} = {};

    async created() {
        
    }

    @Watch('client')
    public async clientChange() {
        if (this.client) {
            this.api = new ClientAddressService(this.client.id);
            if (this.client.billingAddress) {
                this.billingAddressId = this.client.billingAddress.id;
            }

            if (this.client.shippingAddress) {
                if (this.client.billingAddress && this.client.billingAddress.id === this.client.shippingAddress.id) {
                    this.shippingAddressSame = true;
                    this.shippingAddressId = this.client.billingAddress.id;
                } else {
                    this.shippingAddressId = this.client.shippingAddress.id;
                }
            }
            this.initialized = true;
            await this.refresh();
        } else {
            this.addresses = [];
        }
    }

    async refresh() {
        const res = await this.api.get();
        if (res.success) {
            this.addresses = res.result;
        }
    }

    async newAddress() {
        await this.refresh();
    }

    public updateShipping() {

    }

    edit(address: Address) {
        this.editing[address.id] = {...address};
        this.$forceUpdate();
    }

    cancelEdit(address: Address) {
        delete this.editing[address.id];
        this.$forceUpdate();
    }

    async remove(address: Address) {
        await this.api.delete(address.id);
        await this.refresh();
        this.$emit('update');
    }

    async addressUpdate(address: Address) {
        await this.refresh();
        this.cancelEdit(address);
        this.$emit('update');
    }

    async submit() {
        this.loading = true;

        const request = {
            billingAddressId: this.billingAddressId,
            shippingAddressSameAsBilling: this.shippingAddressSame,
            shippingAddressId: this.shippingAddressSame ? void 0 : this.shippingAddressId,
        };

        const res = await this.clientApi.setActiveAddresses(this.client.id, request);

        if (res.success) {
            this.client = res.result;
            await this.refresh();
            this.$emit('update');
        }

        this.loading = false;
    }
}

</script>

<style lang="scss" scoped>

</style>