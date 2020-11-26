<template>
    <div class="container mt-4" v-if="initialized">
        <service-display :service="item" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import ServiceService, {IService} from "./../services/service.service";
import ServiceDisplay from "@/components/ServiceDisplay.vue";

@Component({
    components: {
        ServiceDisplay,
    }
})
export default class Service extends Vue {

    private item!: IService;
    private service!: ServiceService;
    private initialized: boolean = false;

    private async created() {
        console.log("SERVICE PAGE");
        this.service = new ServiceService();
        const res = await this.service.getOne(this.$route.params.id);
        if (res.success) {
            this.item = res.result;
            this.initialized = true;
            console.log(this.item);
        } else {
            console.log(res.error);
        }
        
    }
}

</script>