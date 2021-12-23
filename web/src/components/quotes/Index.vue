<template>
    <div class='container-fluid'>
        <modal title="QuickQuote" :isOpen='formOpen' @close='cancelEdit'>
        </modal>
        <h2>Quotes <button class='btn btn-primary btn-sm float-right' @click='create'><font-awesome-icon icon='plus' /> Create QuickQuote</button></h2>
        <quote-list :quotes='quotes' @remove='remove' @invoice='invoice' @view='view' />
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component} from 'vue-property-decorator';
import { Quote, QuoteService } from '../../services/accounting.service';
import QuoteList from './List.vue'

@Component({
    components: {
        QuoteList,
    }
})
export default class QuotesIndex extends Vue {

    formOpen = false;

    api: QuoteService = new QuoteService();
    quotes: Quote[] = [];
    loading = false;
    initialized = false;

    cancelEdit() {
        this.formOpen = false;
    }

    async created() {
        await this.refresh();
        this.initialized = true;
    }

    async refresh() {
        this.loading = true;
        const res = await this.api.get();
        if (res.success === true) this.quotes = res.result;
        this.loading = false;
        console.log(this.quotes);
    }

    async create() {
        
    }

    async remove(quote: Quote) {

    }

    async invoice(quote: Quote) {

    }

    view(quote: Quote) {
        this.$router.push({name: 'Quote', params: {id: quote.id}});
    }
}

</script>

<style lang="scss" scoped>

</style>