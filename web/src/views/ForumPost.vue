<template>
    <div v-if="initialized">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div>
                <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                    Bold
                </button>
                <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
                    H2
                </button>
            </div>
        </editor-menu-bar>
        <editor-content :editor="editor" />
    </div>
</template>

<script lang="ts">
    import { Editor, EditorContent, EditorMenuBar } from "tiptap";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: { EditorContent, EditorMenuBar }
    })
    export default class ForumPost extends Vue {
        private initialized = false;
        private editor!: Editor;

        private mounted() {
            this.editor = new Editor({
                content: ''
            });
            this.initialized = true;
        }
    }
</script>