<template>
    <div>
        <div class="header">
            <h3 class="primary-font text-center mb-4">
                <font-awesome-icon class="icon" :icon="service.icon" />
                {{service.name}}
            </h3>
            <markdown-viewer v-model="service.longDescription"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import ServiceService, {IService} from "./../services/service.service";
import MarkdownViewer from "@/components/ui/MarkdownViewer.vue";

@Component({
    components: {
        MarkdownViewer,
    }
})
export default class ServiceDisplay extends Vue {

    @Prop()
    public service!: IService;

    private created() {
        console.log(this.service);
    }
}

</script>

<style scoped lang="scss">
@import "@/assets/theme.scss";
.icon {
    font-size: 50px;
    vertical-align: middle;
    margin-right: 10px;
    color: $primaryColor;
}

</style>