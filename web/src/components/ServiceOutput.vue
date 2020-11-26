<template>
    <div class="row">
        <h2 class='primary-font text-center col-12'>Services Offered</h2>
        <div class="col-md-6" v-for="(service, i) in list" :key="i">
            <div class="card mt-3">
                <div class="card-body">
                    <div class="card-title text-center">
                        <font-awesome-icon class="fa-2x icon" :icon="service.icon" />
                        <h4 class="primary-font mt-2"> {{service.name}}</h4>
                    </div>
                    <p class="card-text">{{service.description}}</p>
                    <router-link class="stretched-link" :to="{name: 'Service', params: {id: service.slug}}"></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";
import ServiceService, {IService} from "./../services/service.service";

@Component
export default class ServiceList extends Vue {

    private list: IService[] = [];
    private service!: ServiceService;

    private async getList() {
        const res = await this.service.get();
        if (res.success) {
            this.list = res.result;
        }
    }

    private created() {
        this.service = new ServiceService();
        this.getList();
    }
}

</script>

<style scoped lang="scss">
.card:hover {
    background-color: darken(white, 2%)
}
</style>