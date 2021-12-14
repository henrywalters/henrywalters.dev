<template> 
    <div class='table-responsive'>
        <table class='table'>
            <thead>
                <th>Name</th>
                <th>Rate</th>
                <th>Phone</th>
                <th>Contact</th>
                <th>Billing Address</th>
                <th>Shipping Address</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for='(client, idx) in clients' :key='idx'>
                    <td><b>{{client.name}}</b></td>
                    <td>${{client.rate.toFixed(2)}}</td>
                    <td><phone-display :phone='client.phone' /></td>
                    <td>
                        {{client.contactName}}
                        <a v-if='client.contactEmail' :href='`mailto:${client.contactEmail}`'><font-awesome-icon icon='envelope' /></a>
                    </td>
                    <td><address-display v-if='client.billingAddress' :address='client.billingAddress' /></td>
                    <td><address-display v-if='client.shippingAddress' :address='client.shippingAddress' /></td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='Edit client addresses' @click='$emit("edit-addresses", client)'>
                                <font-awesome-icon icon='map' />
                            </button>
                            <button class='btn btn-sm btn-warning' data-toggle='tooltip' title='Edit client' @click='$emit("edit", client)'>
                                <font-awesome-icon icon='pencil-alt' />
                            </button>
                            <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove client' @click='$emit("remove", client)'>
                                <font-awesome-icon icon='trash' />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins, Prop} from "vue-property-decorator";
    import ConfigMixin from "../../mixins/ConfigMixin";
    import {Client, ClientService} from "./../../services/accounting.service"
    import PhoneDisplay from "./../ui/PhoneDisplay.vue"
    import AddressDisplay from "./../ui/AddressDisplay.vue"

    @Component({
        components: {
            PhoneDisplay,
            AddressDisplay,
        }
    })
    export default class ClientsList extends Mixins(ConfigMixin) {
        @Prop()
        clients!: Client[];
    }
</script>

<style scoped lang="scss">

</style>