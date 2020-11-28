<template>
    <div class="container mt-4" v-if="initialized">
        <service-form v-if="state === States.CREATING || state === States.EDITING" :service="item"/>
        <service-display :service="item" v-else />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
import ServiceService, {IService} from "./../services/service.service";
import ServiceDisplay from "@/components/ServiceDisplay.vue";
import ServiceForm from "@/components/ServiceForm.vue";
import AuthMixin from "../mixins/AuthMixin";

enum State {
    CREATING,
    EDITING,
    VIEWING,
}

@Component({
    components: {
        ServiceDisplay,
        ServiceForm,
    }
})
export default class Service extends Mixins(AuthMixin) {

    private item!: IService;
    private service!: ServiceService;
    private initialized: boolean = false;

    private state: State = State.VIEWING;

    public get States() {
        return State;
    }

    private async created() {
        this.service = new ServiceService();

        if (!this.$route.params.id) {
            await this.authorizeFor('ADMIN');
            this.state = State.CREATING;
        } else {
            const res = await this.service.getOne(this.$route.params.id);
            if (res.success) {
                this.item = res.result;

                if (this.$route.query.hasOwnProperty('mode') && this.$route.query.mode === 'edit') {
                    await this.authorizeFor('ADMIN');
                    this.state = State.EDITING;
                }
            } else {
                this.$router.replace({name: 'PageNotFound'})
            }
        }

        this.initialized = true;

        console.log(this.state);
    }
}

</script>