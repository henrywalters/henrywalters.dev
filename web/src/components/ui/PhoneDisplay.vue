<template>
    <span class='phone-number'>
        {{internationalCode}}{{areaCode}}{{phoneNumber}} <a :href='`tel:${phone}`'><font-awesome-icon icon='phone' /></a>
    </span>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({})
export default class PhoneDisplay extends Vue {
    @Prop()
    public phone!: string;

    created() {
        if (this.phone.length !== 11 && this.phone.length !== 10 && this.phone.length === 7) {
            throw new Error("Only international, US and local phone numbers supported");
        }
    }

    public get internationalCode() {
        if (this.phone.length === 10) {
            return '';
        }

        return `+${this.phone[0]} `;
    }

    public get areaCode() {
        if (this.phone.length === 11) {
            return `(${this.phone.slice(1, 4)}) `;
        } else if (this.phone.length === 10) {
            return `(${this.phone.slice(0, 3)}) `;
        } else {
            return '';
        }
    }

    public get phoneNumber() {
        if (this.phone.length === 11) {
            return `${this.phone.slice(4, 7)}-${this.phone.slice(7, 11)}`;
        } else if (this.phone.length === 10) {
            return `${this.phone.slice(3, 6)}-${this.phone.slice(6, 10)}`;
        } else {
            return `${this.phone.slice(0, 3)}-${this.phone.slice(3, 7)}`;
        }
    }
}

</script>

<style lang="scss" scoped>

</style>