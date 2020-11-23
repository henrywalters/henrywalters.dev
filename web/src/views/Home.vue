<template>
    <div class="container">
        <div class="banner text-center">
            Call us at <a href="#">(734) 123-4567</a> or send an email to <a href="mailto:me@henrywalters.dev">me@henrywalters.dev</a>
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

<style scoped lang="scss">
.banner {

    height: 40px;
    font-size: 22px;

    a {
        color: white;
    }

    background-color: #007bff;
    color: white;
    position: absolute;
    left: 0;
    width: 100%;
}
</style>