<template>
    <div class="container">
        <div id="unityContainer" style="width: 960px; height: 600px"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    //import * as UnityLoader from './../services/UnityLoader';

    @Component({
        name: "DressUp"
    })
    export default class DressUp extends Vue {
        created() {
            //const unityInstance = UnityLoader.instantiate("unityContainer", "DressUp.json", {onProgress: (payload) => {
            //    console.log(payload);
            //}});
        }
    }
</script>