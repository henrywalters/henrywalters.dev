<template>
    <div class="container mt-5">
        <loader v-if='loading' />
        <h4 class='text-danger' v-if='error'>{{error}}</h4>
        <div v-if='!error && payment'>
            <!--<h1 class='void-message' v-if='payment.invoice.status == "Void"'>VOID</h1>-->
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h1 class='brand-font'>Payment Receipt</h1>
                    <p>Thank you so much for your business!</p>
                </div>
                <div class='col-md-4 mb-1'>
                    <div class='row large-text-right mb-0 no-margin'>
                        <div class='col-6'><p><b>Invoice No:</b></p></div>
                        <div class='col-6'><p>#{{payment.invoice.invoiceId}}</p></div>
                    </div>
                    <div class='row large-text-right mb-0 no-margin'>
                        <div class='col-6'><p><b>Payment Amt: </b></p></div>
                        <div class='col-6'><p><currency :value='payment.amount' /></p></div>
                    </div>
                    <div class='row large-text-right mb-0 no-margin'>
                        <div class='col-6'><p><b>Amount Due: </b></p></div>
                        <div class='col-6'><p><currency :value='totalAmount - payment.invoice.amountPaid' /></p></div>
                    </div>
                </div>
            </div>
            <hr />
            <div class='row'>
                <div class='col-md-8 mb-3'>
                    <h4>Billed to:</h4>
                    <h5>{{payment.client.name}}</h5>
                    <div class='no-margin address'>
                        <p v-if='payment.client.contactName'>{{payment.client.contactName}}</p>
                        <div v-if='payment.client.billingAddress'>
                            <p>{{payment.client.billingAddress.streetAddress}}</p>
                            <p v-if='payment.client.billingAddress.unitType'>{{payment.client.billingAddress.unitType}} {{payment.client.billingAddress.unitNumber}}</p>
                            <p>{{payment.client.billingAddress.city}}, {{payment.client.billingAddress.state}} {{payment.client.billingAddress.zipCode}}</p>
                            <p>United States</p>
                        </div>
                        <a v-if='payment.client.contactEmail' :href='`mailto:${payment.client.contactEmail}`'>{{payment.client.contactEmail}}</a>
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
            <hr/>
            <div class='row mt-3'>
                <div class='col-md-12 mb-3 address'>
                    <div class='address'>
                        <h5>Notes</h5>
                        <p>
                            Thank you so much! Your business is very appreciated.
                            If you have any questions regarding this payment, or the work did not exceed your expectations, please reach out to <a href='mailto:me@henrywalters.dev'>me@henrywalters.dev</a>.
                        </p>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';
import { Payment, PaymentService } from '../services/accounting.service';

@Component({})
export default class PaymentConfirmation extends Vue {
    private api: PaymentService = new PaymentService();
    private payment: Payment | null = null;
    private loading: boolean = true;
    private error: string | null = null;

    async created() {
        const res = await this.api.getOne(this.$route.params.id);
        if (res.success === true) {
            this.payment = res.result;
            console.log(this.payment);
        } else {
            this.error = e.message;
        }
        this.loading = false;
    }

    private get totalAmount(): number {
        if (!this.payment) return 0;

        let sum = 0;

        for (const item of this.payment.invoice.items) {
            sum += item.quantity * item.rate;
        }

        return sum;
    }

}

</script>

<style lang="scss" scoped>

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