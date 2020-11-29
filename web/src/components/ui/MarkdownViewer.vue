<template>
    <vue-markdown ref="editor" :source="value" class="markdown"></vue-markdown>
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
        this.$forceUpdate();
    }
}
</script>

<style lang="scss">

    .markdown {
        img {
            max-width: 90%;
            height: auto;
            width: auto\9; /* ie8 */
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
    }

</style>