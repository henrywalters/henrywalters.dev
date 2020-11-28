<template>
    <vue-markdown ref="editor" :source="value"></vue-markdown>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import { Viewer } from '@toast-ui/vue-editor';
import VueMarkdown from "vue-markdown";

@Component({
    components: {
        Viewer,
        VueMarkdown,
    }
})
export default class MarkdownViewer extends Vue {
    @Prop()
    public value!: string;

    @Watch('value')
    private valueChange() {
        console.log(this.value);
        this.$forceUpdate();
        console.log(this.$refs.editor);
    }
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