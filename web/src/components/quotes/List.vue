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
                <tr v-for='(quote, idx) in quotes' :key='idx'>
                    <td><b>{{quote.client.name}}</b></td>
                    <td>{{quote.status}}</td>
                    <td>{{quote.createdAt | luxon }}</td>
                    <td>${{getValue(quote)}}</td>
                    <td>
                        <div class='btn-group'>
                            <button class='btn btn-sm btn-primary' data-toggle='tooltip' title='Convert to invoice' @click='$emit("invoice", quote)'>
                                <font-awesome-icon icon='money-bill-wave' />
                            </button>
                            <button class='btn btn-sm btn-danger' data-toggle='tooltip' title='Remove quote' @click='$emit("remove", quote)'>
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
import { Quote } from '../../services/accounting.service';

@Component({})
export default class QuoteList extends Vue {
    @Prop()
    public quotes!: Quote[];

    getValue(quote: Quote) {
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