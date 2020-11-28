<template>
    <editor :initialValue="internal" initialEditType="wysiwyg" ref="editor" @change="update" height="500px"/>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {Editor} from "@toast-ui/vue-editor";
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

@Component({
    components: {
        Editor,
    }
})
export default class MarkdownEditor extends Vue {
    @Prop()
    public value: string;

    private internal!: string;

    private created() {
        this.internal = this.value ? this.value : "";
    }

    private update(e) {
        // @ts-ignore
        this.$emit('input', this.$refs.editor.invoke('getMarkdown'));
    }
}
</script>