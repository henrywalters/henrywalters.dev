<template>
    <form @submit.prevent='submit'>
        
        <div class='row'>
            <form-group class='col-md-6' label="Street Address" field='streetAddress' :errors='errors'>
                <input type='text' class='form-control' v-model='request.streetAddress' />
            </form-group>
            <form-group class='col-md-3' label="Unit Type" field='unitType' :errors='errors'>
                <input type='text' class='form-control' v-model='request.unitType' />
            </form-group>
            <form-group class='col-md-3' label="Unit No" field='unitNumber' :errors='errors'>
                <input type='text' class='form-control' v-model='request.unitNumber' />
            </form-group>
        </div>

        <div class='row'>
            <form-group class='col-md-6' label="City" field='city' :errors='errors'>
                <input type='text' class='form-control' v-model='request.city' />
            </form-group>
            <form-group class='col-md-3' label="State" field='state' :errors='errors'>
                <input type='text' class='form-control' v-model='request.state' />
            </form-group>
            <form-group class='col-md-3' label="Zip Code" field='zipCode' :errors='errors'>
                <input type='text' class='form-control' v-model='request.zipCode' />
            </form-group>
        </div>
        
        <div class='row'>
            <div class='col-12'>
                <div class='btn-group float-right'>
                    <button class='btn btn-warning float-right' @click.prevent='$emit("cancel")' :disabled='loading' v-if='editing'>
                        Cancel
                    </button>
                    <button class='btn btn-primary' @click='submit' :disabled='loading'>
                        <font-awesome-icon icon='spinner' spin class='mr-2' v-if='loading' />
                        <span v-if='editing'>Save Address</span>
                        <span v-else>Create Address</span>
                    </button>
                </div>
            </div>
        </div>

        
    </form>
</template>

<script lang='ts'>
    
import {Vue, Component, Mixins} from 'vue-property-decorator';
import { Address, AddressCreate } from '../../services/accounting.service';
import { FormMixin } from './../../mixins/FormMixin'

@Component({})
export default class AddressForm extends Mixins<FormMixin<AddressCreate, Address>>(FormMixin) {

    empty: AddressCreate = {
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        unitType: '',
        unitNumber: '',
    }

    objToDto = (obj: Address) => {
        return obj;
    }

    idFn = (obj: Address) => {
        return obj.id;
    }
}

</script>

<style lang="scss" scoped>

</style>