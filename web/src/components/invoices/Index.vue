<template>
    <div class='container-fluid'>
        <h2>Invoices</h2>
        <invoice-list :invoices='invoices' @remove='remove' @view='view' />
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component} from 'vue-property-decorator';
import { Invoice, InvoiceService} from '../../services/accounting.service';
import InvoiceList from "./List.vue"

@Component({
    components: {
        InvoiceList,
    }
})
export default class QuotesIndex extends Vue {

    formOpen = false;

    api: InvoiceService = new InvoiceService();
    invoices: Invoice[] = [];
    loading = false;
    initialized = false;

    cancelEdit() {
        this.formOpen = false;
    }

    async created() {
        await this.refresh();
        this.initialized = true;
    }

    async mounted() {
        await this.refresh();
    }

    async refresh() {
        this.loading = true;
        const res = await this.api.get();
        if (res.success === true) this.invoices = res.result;
        this.loading = false;
    }

    async create() {
        
    }

    async remove(invoice: Invoice) {
        await this.api.delete(invoice.id);
        await this.refresh();
    }

    view(invoice: Invoice) {
        this.$router.push({name: 'Invoice', params: {id: invoice.id}});
    }
}

</script>

<style lang="scss" scoped>

</style>