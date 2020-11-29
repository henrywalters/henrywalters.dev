<template>
    <viewer ref="editor" :initial-value="value" class="markdown" v-code-highlight v-if="value" />
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
        h1, h2, h3, h4, h5, h6 {
            border-bottom: 0px !important;
        }

        h1 {
            font-size: 40px !important;
        }

        h2 {
            font-size: 35px !important;
        }

        h3 {
            font-size: 30px !important;
        }

        h4 {
            font-size: 25px !important;
        }

        h5 {
            font-size: 20px !important;
        }

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

        p, li, th, td {
            font-size: 20px;
            font-family: Helvetica, Arial, sans-serif;
        }

        pre {
            background-color: #002451 !important;
        }

        code {
            font-size: 18px;
        }

        ol > li::before {
            color: black !important;
        }

        ul > li::before {
            background-color: black !important;
            margin-top: 12.5px !important;
        }

        .task-list-item::before {
            margin-top: 5px !important;
        }
    }

</style>