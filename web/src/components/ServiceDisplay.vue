<template>
    <div>
        <div class="header">
            <h3 class="primary-font text-center">
                <font-awesome-icon class="icon" :icon="service.icon" />
                {{service.name}}
            </h3>
            <vue-markdown :source="service.longDescription" />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import ServiceService, {IService} from "./../services/service.service";
import VueMarkdown from "vue-markdown";

@Component({
    components: {
        VueMarkdown,
    }
})
export default class ServiceDisplay extends Vue {

    @Prop()
    public service: IService;
}

</script>

<style scoped lang="scss">

.icon {
    font-size: 50px;
    vertical-align: middle;
    margin-right: 10px;
}

</style>