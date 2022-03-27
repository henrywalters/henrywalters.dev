<template>
    <div class='table-responsive'>
        <table class='table'>
            <thead>
                <th>Client</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Value</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for='(invoice, idx) in invoices' :key='idx'>
                    <td><b>{{invoice.client.name}}</b></td>
                    <td>{{invoice.status}}</td>
                    <td>{{invoice.createdAt | luxon }}</td>
                    <td>${{getValue(invoice)}}</td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='View invoice' @click='$emit("view", invoice)'>
                                <font-awesome-icon icon='eye' />
                            </button>
                            <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove invoice' @click='$emit("remove", invoice)'>
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
import { Invoice } from '../../services/accounting.service';

@Component({})
export default class InvoiceList extends Vue {
    @Prop()
    public invoices!: Invoice[];

    getValue(quote: Invoice) {
        let sum = 0;
        for (const item of quote.items) {
            sum += item.quantity * item.rate;
        }
        return sum;
    }
}

</script>

<style lang="scss" scoped>

</style>