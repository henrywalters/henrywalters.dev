<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(item, i) in list" :key="i">
            <div class="row">
                <div class="col-1"><font-awesome-icon class="fa-2x" :icon="item.icon" /></div>
                <div class="col-9">
                    <router-link class="link-black" :to="{name: 'Service', params: {id: item.id}}"><b>{{item.name}}</b></router-link> - {{item.description}}
                </div>
                <div class="col-2 float-right">
                    <div class="btn-group" role="group">
                        <button class='btn btn-sm btn-primary' @click="$router.push({name: 'Service', params: {id: item.id}, query: {mode: 'edit'}})">
                            <font-awesome-icon icon="edit" />
                        </button>
                        <button class='btn btn-sm btn-danger' @click='deleteService(item.id)' title="Delete Service"><font-awesome-icon icon="trash" /></button>
                    </div>
                </div>
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