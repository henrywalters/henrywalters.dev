<template>
    <div :class="{collapse: !isOpen}" class='collapse-container' ref="body">
        <div class='collapse-content well'> 
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import $ from "jquery";


@Component
export default class Card extends Vue {

    @Prop({type: Boolean, default: false})
    public isOpen!: boolean;

    private opened = false;

    @Watch('isOpen')
    public openChange() {
        this.toggle();
    }

    public open() {
        // @ts-ignore
        $(this.$refs.body).collapse('show');
    }

    public close() {
        // @ts-ignore
        $(this.$refs.body).collapse('hide');
    }

    public toggle() {
        // @ts-ignore
        $(this.$refs.body).collapse('toggle');
        this.opened = !this.opened;
        if (this.opened) this.open();
        else this.close();
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