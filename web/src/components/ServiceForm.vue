<template>
    <form @submit.prevent="submit">

    </form>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";

@Component
export default class ServiceForm extends Vue {
    private async submit() {
        
    }
}

</script>