<template>
    <div class="container mt-5">
        <h1>Thank You For Your Payment</h1>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';
import { Payment, PaymentService } from '../services/accounting.service';

@Component({})
export default class PaymentConfirmation extends Vue {
    private api: PaymentService = new PaymentService();
    private payment: Payment;

    async created() {
        const res = await this.api.getOne(this.$route.params.id);
        if (res.success === true) {
            this.payment = res.result;
        } else {
            console.log(res.error);
        }
    }
}

</script>

<style lang="scss" scoped>

</style>