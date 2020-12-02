<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title primary-font" @click="toggle">
                {{title}}
                <font-awesome-icon class="float-right" :icon="opened ? 'arrow-up' : 'arrow-down'" />
            </h3>
        </div>
        <div class="card-body" :class="{collapse: !openOnInit}" ref="body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import $ from "jquery";


@Component
export default class Card extends Vue {
    @Prop()
    public title!: string;

    @Prop({type: Boolean, default: false})
    public openOnInit!: boolean;

    private opened: boolean = false;
    
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

    private created() {
        this.opened = this.openOnInit;
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