declare module 'tiptap' {
    import Vue from 'vue';
    export class Editor {
        public constructor({});

        public setOptions({}): void;
        public setContent(content: string, emitUpdate?: boolean): void;
        public getHTML(): string;
        public destroy(): void;
    }

    export class EditorMenuBar extends Vue {}

    export class EditorContent extends Vue {}
}