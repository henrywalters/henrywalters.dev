<template>
    <div class="w-100 text-center">
        <font-awesome-icon :class="'fa-' + size + 'x'" icon="spinner" spin v-show="showLoading" />
    </div>
</template>

<script lang="ts">

import {Vue, Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class Loader extends Vue {
    @Prop({type: Number, default: 100})
    public delay!: number;

    @Prop({type: Boolean, default: true})
    public loading!: boolean;

    @Prop({type: Number, default: 3})
    public size!: number;

    private pastDelay: boolean = false;

    private get showLoading() {
        return this.loading && this.pastDelay;
    }

    private mounted() {
        this.pastDelay = false;
        setTimeout(() => {
            this.pastDelay = true;
        }, this.delay);
    }
}

</script>