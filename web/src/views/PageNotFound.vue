<template> 
    <div class="container">
        <h3 class="primary-font text-center">Page not found</h3>
        <p class="secondary-font text-center">The page you've requested could not be found.</p>
        <div class="text-center">
            <button class="btn btn-primary" @click="$router.back()">Go Back</button>
            <button class="btn btn-primary ml-3" @click="$router.replace({name: 'Home'})">Go Home</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";

    @Component({
        name: "PageNotFound",
        components: {

        }
    })
    export default class PageNotFound extends Mixins(ConfigMixin) {
        
    }
</script>

<style scoped lang="scss">

</style>