<template>
    <div class='card card-body'>
        <form class='payment-portal' @submit.prevent='submit'>
            <label><b>Payment Amount</b></label>
            <div class='input-group'>
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input type='number' min='0' :max='maxValue' step='0.01' v-model='amount' class='form-control' @change="$emit('amount-change', parseFloat(amount))"/>
            </div>
            <label class='mt-3'><b>Card Details</b></label>
            <stripe-element-card
                ref='stripe'
                :pk='stripeKey'
                @token='tokenCreated'
                @error='setError'
                @loading='setLoading'
                :hidePostalCode='true'
                :classes="{
                    base: 'form-control'
                }"
            />

            <p class='text-danger m-0' v-if='error'>{{error}}</p>

            <button class='btn btn-large btn-success float-right mt-4 w-100' @click='submit' :disabled='disabled'>
                <span v-if='disabled'>Processing Payment <font-awesome-icon icon='spinner' spin /></span>
                <span v-else>Confirm Payment</span>
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {StripeElementCard} from "@vue-stripe/vue-stripe";

@Component({
    components: {
        StripeElementCard,
    }
})
export default class PaymentPortal extends Vue {

    @Prop({type: Number, default: 0})
    public defaultValue!: number;

    @Prop({type: Number})
    public maxValue!: number;

    @Prop({type: Boolean, default: false})
    public loading!: boolean;

    @Prop({type: String})
    public error!: string;

    private amount: number = 0;
    private stripeKey!: string;

    private loadingCard: boolean = false;

    private disabled: boolean = false;

    @Watch('loading')
    public loadingChange(loading: boolean) {
        this.disabled = loading ? true : this.loadingCard;
    }

    created() {
        // @ts-ignore
        this.stripeKey = process.env.VUE_APP_STRIPE_PUB_KEY;
        this.amount = this.defaultValue;
        this.loadingChange(this.loading);
    }

    submit() {
        this.$emit('clear');
        // @ts-ignore
        this.$refs.stripe.submit();
    }

    tokenCreated(cardObject: any) {
        this.$emit('token-change', cardObject.id);
        this.$emit('submit');
    }

    setError(error: any) {
        console.log(error);
    }

    setLoading(loading: boolean) {
        this.loadingCard = loading;
        this.disabled = this.loadingCard;
    }

    focus() {
        // @ts-ignore
        this.$refs.stripe.focus();
        // window.scrollTo(0,)
    }
}

</script>