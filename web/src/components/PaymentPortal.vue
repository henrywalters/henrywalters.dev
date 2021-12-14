<template>
    <div class='card card-body'>
        <form class='payment-portal' @submit.prevent='submit'>
            <label><b>Payment Amount</b></label>
            <div class='input-group'>
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input type='number' min='0' :max='maxValue' step='0.01' v-model='amount' class='form-control' @change="$emit('amount-change', amount)"/>
            </div>
            <label class='mt-3'><b>Card Details</b></label>
            <stripe-element-card
                ref='stripe'
                :pk='stripeKey'
                @token='tokenCreated'
                :hidePostalCode='true'
                :classes="{
                    base: 'form-control'
                }"
            />
            <button class='btn btn-large btn-success float-right mt-3' @click='submit'>Pay Now!</button>
        </form>
    </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
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

    private amount: number = 0;
    private stripeKey!: string;

    created() {
        // @ts-ignore
        this.stripeKey = process.env.VUE_APP_STRIPE_PUB_KEY;
        this.amount = this.defaultValue;
    }

    submit() {
        // @ts-ignore
        this.$refs.stripe.submit();
    }

    tokenCreated(token: string) {
        this.$emit('token-change', token);
        this.$emit('submit');
    }

    focus() {
        // @ts-ignore
        this.$refs.stripe.focus();
        console.log("Focused");
        // window.scrollTo(0,)
    }
}

</script>