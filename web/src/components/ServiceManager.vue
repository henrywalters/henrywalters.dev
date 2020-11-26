<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title primary-font">Services</h4>
        </div>
        <div class="card-body">
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";

@Component
export default class ServiceManager extends Vue {
    private async submit() {
        
    }
}

</script>