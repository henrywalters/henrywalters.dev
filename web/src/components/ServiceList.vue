<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(item, i) in list" :key="i">
            <font-awesome-icon :icon="item.icon" />
            <b>{{item.name}}</b>
            <div class="btn-group pull-right" role="group">
                <button class='btn btn-sm btn-danger' @click='deleteService(item.id)' title="Delete Service"><font-awesome-icon icon="trash" /></button>
            </div>
        </li>
    </ul>
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