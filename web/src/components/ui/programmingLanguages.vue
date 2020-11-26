<template>
    <div class="programming-languages">
        <span v-for="language in languages" class="badge badge-pill mr-2" :class="badgeColor(language)">{{language}}</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({name: "ProgrammingLanguages"})
    export default class ProgrammingLanguages extends Vue {
        @Prop()
        public languages!: string[];

        private badgeColor(language: string): string {
            switch (language) {
                case 'Typescript':
                case 'TypeScript':
                    return 'badge-primary';
                case 'WebGL':
                    return 'badge-secondary';
                case 'HTML':
                    return 'badge-success';
                case 'CSS':
                    return 'badge-warning';
                case 'C++':
                case 'c++': return 'badge-success';
                case 'Vue': return 'badge-warning';

                default: return 'badge-dark';
            }
        }
    }
</script>