<template> 
    <div class="container mt-5">
        <loader v-if='loading' />
        <h4 class='text-danger' v-if='error'>{{error}}</h4>
        <div v-if='!error'>
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h1 class='brand-font'>QUOTE</h1>
                    <h4>Total Amount: ${{this.totalAmount.toFixed(2)}}</h4>
                </div>
                <div class='col-md-4 mb-1'>
                    <div class='row large-text-right mb-0 no-margin'>
                        <div class='col-6'><p><b>Quote No:</b></p></div>
                        <div class='col-6'><p>#{{quote.quoteId}}</p></div>
                    </div>
                    <div class='row large-text-right mt-0 no-margin'>
                        <div class='col-6'><p><b>Quote Date:</b></p></div>
                        <div class='col-6'><p>{{quote.date | luxon}}</p></div>
                    </div>
                </div>
            </div>
            <hr />
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h4>Quote prepared for:</h4>
                    <h5>{{quote.client.name}}</h5>
                    <div class='no-margin address'>
                        <p v-if='quote.client.contactName'>{{quote.client.contactName}}</p>
                        <div v-if='quote.client.billingAddress'>
                            <p>{{quote.client.billingAddress.streetAddress}}</p>
                            <p v-if='quote.client.billingAddress.unitType'>{{quote.client.billingAddress.unitType}} {{quote.client.billingAddress.unitNumber}}</p>
                            <p>{{quote.client.billingAddress.city}}, {{quote.client.billingAddress.state}} {{quote.client.billingAddress.zipCode}}</p>
                            <p>United States</p>
                        </div>
                        <a v-if='quote.client.contactEmail' :href='`mailto:${quote.client.contactEmail}`'>{{quote.client.contactEmail}}</a>
                    </div>
                </div>
                <div class='col-md-4'>
                    <h4 class='text-right'>Quote prepared by:</h4>
                    <div class='address no-margin large-text-right'>
                        <h5>Henry Walters Development</h5>
                        <p>Henry Walters</p>
                        <p>3167 Wolverine Dr</p>
                        <p>Ann Arbor, MI 48108</p>
                        <p>United States</p>
                        <p><a href='mailto:me@henrywalters.dev'>me@henrywalters.dev</a></p>
                    </div>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-12 table-responsive'>
                    <table class='table'>
                        <thead class='thead-dark'>
                            <th>Quote Item No.</th>
                            <th>Description</th>
                            <th class='text-center'>Quantity</th>
                            <th class='text-center'>Rate</th>
                            <th class='text-right'>Total</th>
                        </thead>
                        <tbody>
                            <tr v-for='(item, idx) in quote.items' :key='idx'>
                                <td>#{{item.quoteItemId}}</td>
                                <td class='no-margin address'>
                                    <h6 class='mb-0'>{{item.title}}</h6>
                                    <markdown-viewer v-if='item.description' :value='item.description' />
                                </td>
                                <td class='text-center'>{{item.quantity}}</td>
                                <td class='text-center'>${{item.rate.toFixed(2)}}</td>
                                <td class='text-right'>${{(item.quantity * item.rate).toFixed(2)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div class='row mt-3'>
                <div class='col-md-6 mb-3 address'>
                    <div class='address'>
                        <h5>Notes</h5>
                        <p>
                            Thank you so much! Your business is very appreciated.
                            If you have any questions or concerns regarding this Quote, please reach out to <a href='mailto:me@henrywalters.dev'>me@henrywalters.dev</a>.
                        </p>
                        <h6>Terms and Conditions</h6>
                        <p>Payment is due upon receipt.</p>
                    </div>
                    
                    
                </div>
                <div class='col-md-1'></div>
                <div class='col-md-5 text-right'>
                    <h4>Quote Total: ${{this.totalAmount.toFixed(2)}}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins} from "vue-property-decorator";
import ConfigMixin from "../mixins/ConfigMixin";
import { Invoice, InvoiceService, Quote, QuoteService } from "../services/accounting.service";

    @Component({
        components: {
            
        }
    })
    export default class QuoteView extends Mixins(ConfigMixin) {

        private quote: Quote | null = null;
        private error: string | null = null;
        private loading: boolean = true;

        private paymentAmount: number = 0;
        private paymentCardId: string = "";

        private async created() {
            const quotes = new QuoteService();
            const res = await quotes.getOne(this.$route.params.id);
            console.log(res);
            if (res.success) {
                this.quote = res.result;
                document.title = `Quote #${this.quote.quoteId}`;
            } else {
                this.$router.replace({name: 'PageNotFound'});
            }

            this.loading = false;
        }

        private getName(): string {
            return this.getConfig('NAME');
        }

        private get nameStart(): string {
            const raw = this.getName();
            const parts = raw.split(' ');
            return parts.slice(0, parts.length - 1).join(' ');
        }

        private get nameEnd(): string {
            const raw = this.getName();
            const parts = raw.split(' ');
            return parts[parts.length - 1];
        }

        private get totalAmount(): number {
            if (!this.quote) return 0;

            let sum = 0;

            for (const item of this.quote.items) {
                sum += item.quantity * item.rate;
            }

            return sum;
        }
    }
</script>

<style scoped lang="scss">

    @media (min-width: 767px) {
        .large-text-right { text-align: right }
    }

    .address {
        p {
            font-size: 14px;
        }
        
    }

    .no-margin {
        p {
            margin: 0;
        }
    }

    .small {
        p {
            font-size: 12px !important;
        }
        
    }
</style>