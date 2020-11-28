<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title primary-font">Services</h4>
        </div>
        <div class="card-body">
            <button class="form-control btn btn-primary" @click.prevent="$router.push({name: 'Service'})">New Service</button>
            <service-list class="mt-3" />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";
import ServiceList from "@/components/ServiceList.vue";

@Component({
    components: {
        ServiceList,
    }
})
export default class ServiceManager extends Vue {
    private async submit() {
        
    }
}

</script>