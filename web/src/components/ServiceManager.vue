<template>
    <card-collapsible title="Services">
        <button class="form-control btn btn-primary" @click.prevent="$router.push({name: 'Service'})">New Service</button>
        <service-list class="mt-3" />
    </card-collapsible>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";
import ServiceList from "@/components/ServiceList.vue";
import CardCollapsible from "@/components/ui/CardCollapsible.vue";

@Component({
    components: {
        ServiceList,
        CardCollapsible,
    }
})
export default class ServiceManager extends Vue {
    private async submit() {
        
    }
}

</script>