<template>
    <div class="container">
        <div class="body text-center" v-if="initialized">
            <h4 class="text-center">Thank you for visiting my site!</h4>
            <p class="text-center">More content is coming soon, in the meantime, check out the Projects Page, About Me & Contact form.</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({name: "Home"})
    export default class Home extends Vue {
        private initialized = true;
    }
</script>