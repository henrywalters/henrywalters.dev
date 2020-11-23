<template> 
    <div class="container">
        <h3 class="primary-font">Title of Page</h3>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";

    @Component({
        name: "Page",
        components: {

        }
    })
    export default class Page extends Mixins(ConfigMixin) {
        
    }
</script>

<style scoped lang="scss">

</style>