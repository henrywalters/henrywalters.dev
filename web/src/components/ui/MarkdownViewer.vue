<template>
    <viewer ref="editor" :initial-value="value" class="markdown" v-code-highlight v-if="value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import { Viewer } from '@toast-ui/vue-editor';

@Component({
    components: {
        Viewer,
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

        $h1: 40px;
        $h2: 35px;
        $h3: 30px;
        $h4: 25px;
        $h5: 20px;

        h1 {
            font-size: $h1 !important;
            line-height: $h1 !important;
        }

        h2 {
            font-size: $h2 !important;
            line-height: $h2 !important;
        }

        h3 {
            font-size: $h3 !important;
            line-height: $h3 !important;
        }

        h4 {
            font-size: $h4 !important;
            line-height: $h4 !important;
        }

        h5 {
            font-size: $h5 !important;
            line-height: $h5 !important;
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
            font-size: 16px;
        } 

        pre code {
            word-wrap: unset !important;
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