<template>
    <editor :initialValue="internal" :height="height + 'px'" :options="mdConfig" initialEditType="wysiwyg" ref="editor" @change="update" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
import {Editor} from "@toast-ui/vue-editor";
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { UserFileService } from "../../services/userFile.service";
import NotificationMixin from "../../mixins/NotificationMixin";

@Component({
    components: {
        Editor,
    }
})
export default class MarkdownEditor extends Mixins(NotificationMixin) {
    @Prop()
    public value!: string;

    @Prop({type: Number, default: 300})
    public height!: number;

    private internal!: string;

    private get mdConfig() {
        return {
            hooks: {
                addImageBlobHook: async (blob: File, callback: (url: string, alt: string) => void) => {
                    console.log(blob);
                    // @ts-ignore
                    const alt = document.querySelector('.te-link-text-input').value;

                    const data = new FormData();
                    data.append('alt', alt);
                    data.append('name', blob.name);
                    data.append('file', blob);
                    
                    const res = await (new UserFileService()).postFormData(data);

                    if (res.success) {
                        callback(res.result.cdn, alt);
                    } else {
                        this.notifyError("Failed to save image");
                    }

                    return false;
                }
            }
        };
    }

    private created() {
        this.internal = this.value ? this.value : "";
    }

    private update() {
        // @ts-ignore
        this.$emit('input', this.$refs.editor.invoke('getMarkdown'));
    }
}
</script>