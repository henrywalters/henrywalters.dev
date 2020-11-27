<template> 
    <div class="container">
        <h3 class="primary-font text-center">Unauthorized Access</h3>
        <p class="secondary-font text-center">You are not authorized to access this page.</p>
        <div class="text-center">
            <button class="btn btn-primary" @click="$router.replace({name: 'Login'})">Login</button>
            <button class="btn btn-primary ml-3" @click="$router.replace({name: 'Home'})">Go Home</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";

    @Component({
        components: {

        }
    })
    export default class Unauthorized extends Mixins(ConfigMixin) {
        
    }
</script>

<style scoped lang="scss">

</style>