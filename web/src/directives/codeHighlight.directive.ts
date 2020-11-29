import Vue from "vue";
import Hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night-blue.css'

const CodeHighlight = {
    install: (Vue: any, options: Object) => {
        Vue.directive('code-highlight', (el: HTMLElement) => {
            setTimeout(() => {
                const blocks = el.querySelectorAll('pre');
                blocks.forEach((block) => {
                    Hljs.highlightBlock(block as HTMLElement);
                })
            }, 1);
            
        })
    }
}

export default CodeHighlight;