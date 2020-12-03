<template>
    <div class='markdown-viewer'>
        <div v-if='tableOfContents' class='table-of-contents mb-5'>
            <h3>Table of Contents</h3>
            <ol>
                <li v-for="(header, i) in headers" :key="i">
                    <a :href="'#' + header.hash" class="link-black">{{header.title}}</a>
                </li>
            </ol>
        </div>
        <viewer ref="viewer" :initial-value="value" class="markdown" v-code-highlight v-if="value" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Mixins} from "vue-property-decorator";
import { Viewer } from '@toast-ui/vue-editor';
import { dom } from '@fortawesome/fontawesome-svg-core'
import ClipboardMixin from "../../mixins/ClipboardMixin";


interface Bookmark {
    title: string;
    hash: string;
}

@Component({
    components: {
        Viewer,
    }
})
export default class MarkdownViewer extends Mixins(ClipboardMixin) {
    @Prop()
    public value!: string;

    @Prop({type: Boolean, default: false})
    public tableOfContents!: boolean;

    @Prop({type: Boolean, default: false})
    public bookmarks!: boolean;

    private headers: Bookmark[] = [];

    @Watch('value')
    private valueChange() {
        this.$forceUpdate();
    }

    private hashHeader(header: string) {
        // @ts-ignore
        return header.toLowerCase().replaceAll(" ", "_").replace(/[^\w\s]/gi, '');
    }

    private mounted() {

        if (this.bookmarks) {

            dom.watch();

            const headers = document.querySelectorAll('.markdown h1');
            // @ts-ignore
            for (const header of headers) {
                const html = header.innerHTML;
                const hash = this.hashHeader(html)
                header.innerHTML = `<a href='#${hash}' @click.prevent="copy('${hash}')"><i class="link-black fa fa-link fa-1x"></i></a> ` + header.innerHTML;
                header.id = hash;

                this.headers.push({
                    hash: hash,
                    title: html,
                })
            }

            console.log(this.headers);

            if (this.$route.hash) {
                const el = document.querySelector(this.$route.hash);
                el && el.scrollIntoView();
            }

            this.$forceUpdate();
        }
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

        ol, ul {
            font-size: 20px;
        }

        p, li, th, td, a {
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