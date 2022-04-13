<template>
    <span class='currency'>
        {{display}}
    </span>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({})
export default class CurrencyDisplay extends Vue {
    @Prop({type: Number, default: 0})
    public value!: number;

    @Prop({type: String, default: 'USD'})
    public currency!: string;

    private get display(): string {
        const fmt = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currency,
        })

        return fmt.format(this.value);
    }
}

</script>

<style lang="scss" scoped>

</style>