<template> 
  <input class="form-control" type="text" v-model="internalValue" @keydown="keyPress" />
</template>

<script lang="ts">
import {Component, Vue, Mixins, Prop, Watch} from "vue-property-decorator";


    @Component
    export default class SlugInput extends Vue {
        @Prop()
        public value!: string;

        private rawValue: string = "";
        private internalValue: string = "";

        private sanitize(str: string) {
            let slug = "";
            // Change to lower case
            let titleLower = str.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            // Special Characters
            slug = slug.replace(/[^\w\s]/gi, '');
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');
            
            return slug;
        }

        private keyPress(e: any) {
            console.log(e);
        }

        @Watch('internalValue')
        public valueChange() {
            this.internalValue = this.sanitize(this.internalValue);
        }

        private created() {
            this.internalValue = this.value ? this.value : "";
        }
    }
</script>
