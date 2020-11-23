<template>
    <div class="banner-container">
        <div class="banner text-center">
            Call us at <a :href="'tel:' + getConfig('PHONE')">{{getConfig('PHONE')}}</a> or send an email to <a :href="'mailto:' + getConfig('EMAIL')">{{getConfig('EMAIL')}}</a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";

    @Component({name: "Home"})
    export default class Home extends Mixins(ConfigMixin) {
        private initialized = true;
    }
</script>

<style scoped lang="scss">

.banner-container {
    display: table;
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #007bff;
}

.banner {
    padding: 10px;
    position: relative;
    display: table-cell;

    font-size: 24px;

    text-align: center;

    a {
        color: white;
    }
    
    color: white;
    
}
</style>