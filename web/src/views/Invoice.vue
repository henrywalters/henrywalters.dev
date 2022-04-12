<template> 
    <div class="container mt-5">
        <loader v-if='loading' />
        <h4 class='text-danger' v-if='error'>{{error}}</h4>
        <div v-if='!error && invoice'>
            <h1 class='void-message' v-if='invoice.status == "Void"'>VOID</h1>
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h1 class='brand-font'>INVOICE</h1>
                    <h4>Total Amount: ${{(this.totalAmount - invoice.amountPaid).toFixed(2)}}</h4>
                    <button class='btn btn-large btn-success mt-3' @click='gotoPayment'>Pay Now!</button>
                </div>
                <div class='col-md-4 mb-1'>
                    <div class='row large-text-right mb-0 no-margin'>
                        <div class='col-6'><p><b>Invoice No:</b></p></div>
                        <div class='col-6'><p>#{{invoice.invoiceId}}</p></div>
                    </div>
                    <div class='row large-text-right mt-0 no-margin'>
                        <div class='col-6'><p><b>Invoice Date:</b></p></div>
                        <div class='col-6'><p>{{invoice.date | luxon}}</p></div>
                    </div>
                    <div class='row large-text-right mt-0 no-margin'>
                        <div class='col-6'><p><b>Due Date:</b></p></div>
                        <div class='col-6'><p>{{invoice.date | luxon}}</p></div>
                    </div>
                </div>
            </div>
            <hr />
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h4>Bill to:</h4>
                    <h5>{{invoice.client.name}}</h5>
                    <div class='no-margin address'>
                        <p v-if='invoice.client.contactName'>{{invoice.client.contactName}}</p>
                        <div v-if='invoice.client.billingAddress'>
                            <p>{{invoice.client.billingAddress.streetAddress}}</p>
                            <p v-if='invoice.client.billingAddress.unitType'>{{invoice.client.billingAddress.unitType}} {{invoice.client.billingAddress.unitNumber}}</p>
                            <p>{{invoice.client.billingAddress.city}}, {{invoice.client.billingAddress.state}} {{invoice.client.billingAddress.zipCode}}</p>
                            <p>United States</p>
                        </div>
                        <a v-if='invoice.client.contactEmail' :href='`mailto:${invoice.client.contactEmail}`'>{{invoice.client.contactEmail}}</a>
                    </div>
                </div>
                <div class='col-md-4'>
                    
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
                            <th>Invoice Item No.</th>
                            <th>Description</th>
                            <th class='text-center'>Quantity</th>
                            <th class='text-center'>Rate</th>
                            <th class='text-right'>Total</th>
                        </thead>
                        <tbody>
                            <tr v-for='(item, idx) in invoice.items' :key='idx'>
                                <td>#{{item.invoiceItemId}}</td>
                                <td class='no-margin address'>
                                    <h6 class='mb-0'>{{item.title}}</h6>
                                    <p v-if='item.description'>{{item.description}}</p>
                                </td>
                                <td class='text-center'>{{item.quantity}}</td>
                                <td class='text-center'>${{item.rate.toFixed(2)}}</td>
                                <td class='text-right'>${{(item.quantity * item.rate).toFixed(2)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-md-6 mb-3 address'>
                    <div class='address'>
                        <h5>Notes</h5>
                        <p>
                            Thank you so much! Your business is very appreciated.
                            If you have any questions or concerns regarding this invoice, please reach out to <a href='mailto:me@henrywalters.dev'>me@henrywalters.dev</a>.
                        </p>
                        <h6>Terms and Conditions</h6>
                        <p>Payment is due upon receipt.</p>
                    </div>
                    
                    
                </div>
                <div class='col-md-1'></div>
                <div class='col-md-5'>
                    <table class='w-100'>
                        <tr>
                            <td class='text-right'><b>Invoice Total: </b></td>
                            <td class='text-right'>${{this.totalAmount.toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td class='text-right'><b>Amount Paid: </b></td>
                            <td class='text-right'>${{invoice.amountPaid.toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td class='text-right'><h5><b>Total Amount Owed: </b></h5></td>
                            <td class='text-right'><h5>${{(this.totalAmount - invoice.amountPaid).toFixed(2)}}</h5></td>
                        </tr>
                    </table>
                    <payment-portal
                        v-if='invoice.status != "Void"'
                        ref='portal' 
                        class='mt-3'
                        :loading='processingPayment'
                        :defaultValue="this.totalAmount - invoice.amountPaid" 
                        :maxValue="this.totalAmount - invoice.amountPaid"
                        :error='paymentError'
                        @clear='paymentError = null'
                        @amount-change='setAmount'
                        @token-change='setToken'
                        @submit='pay'
                    />

                    <div v-if='invoice.payments.length > 0' class='mt-3'>
                        <h5 class='text-right'>Payment History</h5>
                        <table class='w-100'>
                            <tr v-for='(payment, idx) in invoice.payments' :key='idx'>
                                <td class='text-right'>{{payment.timestamp | luxon}}</td>
                                <td class='text-right'>${{payment.amount.toFixed(2)}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
import ConfigMixin from "../mixins/ConfigMixin";
import { Invoice, InvoiceService, PaymentService } from "../services/accounting.service";
import PaymentPortal from "../components/PaymentPortal.vue"

    @Component({
        components: {
            PaymentPortal,
        }
    })
    export default class InvoiceView extends Mixins(ConfigMixin) {

        private invoice: Invoice | null = null;
        private error: string | null = null;
        private paymentError: string | null = null;
        private loading: boolean = true;

        private processingPayment: boolean = false;

        private paymentAmount: number = 0;
        private paymentCardId: string = "";

        private api = new PaymentService();

        private async created() {
            const invoices = new InvoiceService();
            const res = await invoices.getOne(this.$route.params.id);

            if (res.success) {
                this.invoice = res.result;
                this.paymentAmount = this.totalAmount - res.result.amountPaid;
            } else {
                this.error = "Invoice does not exist";
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
            if (!this.invoice) return 0;

            let sum = 0;

            for (const item of this.invoice.items) {
                sum += item.quantity * item.rate;
            }

            return sum;
        }

        gotoPayment() {
            // @ts-ignore
            this.$refs.portal.focus();
        }

        private setAmount(amount: number) {
            this.paymentAmount = amount;
        }

        private setToken(token: string) {
            this.paymentCardId = token;
        }

        async pay() {
            this.processingPayment = true;
            try {
                const payment = await this.api.post({
                    cardId: this.paymentCardId,
                    amount: this.paymentAmount,
                    invoiceId: this.invoice.id
                });
                if (payment.success === true) {
                    this.$router.push({name: 'Payment', params: {id: payment.result.id}})
                } else {
                    this.paymentError = payment.error.message;
                }
                this.processingPayment = false;
            } catch (e) {
                this.processingPayment = false;
                this.paymentError = "An unknown error occurred. Please try again shortly."
            }
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

    .void-message {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 200px;
        color: red;
        transform: translate(-50%, -50%) rotate(-22.5deg); 
        z-index: 100;
    }
</style>