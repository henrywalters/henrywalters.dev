<template>
    <div class="container mt-4">
        <loader v-if="loading" />
        <div v-if="initialized">
            <service-form v-if="state === States.CREATING || state === States.EDITING" :service="item" />
            <service-display :service="item" class="article" v-else />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Mixins, Watch} from "vue-property-decorator";
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
    private loading: boolean = false;

    private state: State = State.VIEWING;

    public get States() {
        return State;
    }

    @Watch("$route.params")
    private async routeChanged() {
        this.init();
    }

    private async created() {
        this.init();
    }

    private async init() {
        this.service = new ServiceService();
        this.loading = true;
        this.initialized = false;

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
        this.loading = false;
        this.initialized = true;
        this.$forceUpdate();
    }
}

</script>