<template>
    <form @submit.prevent="submit">
        <form-group label="Name" field="name" :errors="errors">
            <input class="form-control" type="string" v-model="request.name" />
        </form-group>
        <form-group label="Slug" field="slug" :errors="errors">
            <input class="form-control" type="string" v-model="request.slug" />
        </form-group>
        <form-group label="Icon" field="icon" :errors="errors">
            <select class="form-control" v-model="request.icon">
                <option v-for="(icon, i) in icons" :key="i" :value="icon.iconName">
                    <font-awesome-icon :icon="[icon.prefix, icon.iconName]" />{{icon.iconName}}
                </option>
            </select>
        </form-group>
        <form-group label="Description" field="description" :errors="errors">
            <textarea class="form-control" v-model="request.description"></textarea>
        </form-group>
        <form-group label="Long Description" field="longDescription" :errors="errors">
            <markdown-editor v-model="request.longDescription" />
        </form-group>
        <div class="form-group">
            <button class="btn btn-primary form-control" @click.prevent="submit">Submit</button>
        </div>
        <transition name="fade">
            <div class="form-group" v-if="success">
                <p class="alert-success p-1 text-center">{{success}}</p>
            </div>
            <div class="form-group" v-if="error">
                <p class="alert-danger p-1 text-center">{{error}}</p>
            </div>
        </transition>
        <loader :size="2" v-if="loading" />
    </form>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import {HashMap} from "./../services/base.service";
import MarkdownEditor from "@/components/ui/MarkdownEditor.vue";
import ServiceService, { IService } from "../services/service.service";
import Icons from "../services/icons.service";
import { IconLookup } from "@fortawesome/fontawesome-svg-core";

@Component({
    components: {
        MarkdownEditor,
        FormGroup,
    }
})
export default class ServiceForm extends Vue {

    @Prop()
    public service!: IService;

    private request!: IService;

    private api!: ServiceService;

    private errors: HashMap<string> = {};

    private loading: boolean = false;

    private error: string | null = null;
    private success: string | null = null;

    private editing: boolean = false;

    private icons: IconLookup[] = [];

    private async created() {
        this.api = new ServiceService();
        this.icons = Icons.GetStandardIcons();
        if (this.service) {
            this.request = this.service;
            this.editing = true;
        } else {
            this.request = {
                name: '',
                icon: '',
                slug: '',
                description: '',
                longDescription: ''
            }
        }
    }

    private updateLongDesc(e) {
        console.log(e);
    }

    private async submit() {
        this.loading = true;

        const res = this.editing ? await this.api.put(this.service.id, this.request) : await this.api.post(this.request);

        this.success = null;
        this.error = null;

        if (res.success) {
            this.success = "Service saved successfully";
            this.$router.push({name: 'Service', params: {id: res.result.id}});
        } else {
            this.errors = res.error;
            this.error = "Failed to save service";
            setTimeout(() => {
                this.error = null;
            }, 2000);
        }

        this.loading = false;
    }
}

</script>