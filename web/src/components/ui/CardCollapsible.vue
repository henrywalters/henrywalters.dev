<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title primary-font" @click="toggle">
                {{title}}
                <font-awesome-icon class="float-right" :icon="opened ? 'arrow-up' : 'arrow-down'" />
            </h3>
        </div>
        <div :class="{collapse: !openOnInit}" ref="body">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
        <collapsible :isOpen='opened' ref='body'>
            <div class="card-body">
                <slot></slot>
            </div>
        </collapsible>
    </div>
</template>

<script lang="ts">
import Collapsible from './Collapsible.vue';
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import $ from "jquery";


@Component({
    components: {
        Collapsible,
    }
})
export default class Card extends Vue {
    @Prop()
    public title!: string;

    @Prop({type: Boolean, default: false})
    public openOnInit!: boolean;

    private opened: boolean = false;

    private created() {
        this.opened = this.openOnInit;
    }

    toggle() {
        // @ts-ignore
        this.$refs.body.toggle();
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";

    .card-header:hover {
        background-color: $primaryHoverColor !important;
        cursor: pointer;
    }
</style>