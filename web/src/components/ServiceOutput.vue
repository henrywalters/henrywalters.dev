<template>
    <div class="row">
        <h2 class='primary-font text-center col-12'>Services Offered</h2>
        <div class="col-md-6" v-for="(service, i) in list" :key="i">
            <div class="card mt-3" @click="$router.push({name: 'Service', params: {id: service.slug}})">
                <div class="card-body">
                    <div class="card-title text-center">
                        <font-awesome-icon class="fa-2x icon" :icon="service.icon" />
                        <h4 class="primary-font mt-2"> {{service.name}}</h4>
                    </div>
                    <p class="card-text">{{service.description}}</p>
                    <p class="text-center call-to-action"><router-link :to="{name: 'Service', params: {id: service.slug}}">Learn More</router-link></p>
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

@import "@/assets/theme.scss";

.icon {
    color: $primaryColor;
}

.card {
    cursor: pointer;
}

.card:hover {
    background-color: rgb(247, 245, 245);
}

.call-to-action {
    font-size: 22px;
}

</style>