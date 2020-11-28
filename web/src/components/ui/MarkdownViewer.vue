<template>
    <viewer :initial-value="value" />
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import { Viewer } from '@toast-ui/vue-editor';

@Component({
    components: {
        Viewer,
    }
})
export default class MarkdownViewer extends Vue {
    @Prop()
    public value!: string;
}
</script>

<style lang="scss">


    img {
        max-height: 500px !important;
        width: auto;
        display: block;
        margin: 0 auto !important;
    }

    ul {
        font-size: 16px;
    }

    p {
        font-size: 20px;
        font-family: Helvetica, Arial, sans-serif;
    }

</style>