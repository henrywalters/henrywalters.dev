<template>
    <span v-if='type === "simple"'>
        {{address.streetAddress}}, {{address.city}}, {{address.state}}
    </span>
    <span v-else-if='type === "city"'>
        {{address.city}}, {{address.state}}
    </span>
    <span v-else-if='type === "full-inline"'>
        {{address.streetAddress}}<span v-if='address.unitType && address.unitNumber'>, {{address.unitType}} {{address.unitNumber}}</span>, {{address.city}}, {{address.state}} {{address.zipCode}}
    </span>
    <div v-else-if='type === "full"' class='address'>
        <p>{{address.streetAddress}}</p>
        <p v-if='address.unitType && address.unitNumber'>{{address.unitType}} {{address.unitNumber}}</p>
        <p>{{address.city}}, {{address.state}} {{address.zipCode}}</p>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';
import { Address } from '../../services/accounting.service';

@Component({})
export default class AddressDisplay extends Vue {
    @Prop()
    public address!: Address;

    @Prop({type: String, default: 'simple'})
    public type!: string;
}

</script>

<style lang="scss" scoped>
.address {
    p {
        margin: 0;
    }
}
</style>