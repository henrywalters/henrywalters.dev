<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title primary-font">Tracked Links</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="submit">
                <form-group label="Link" field="link" :errors="errors">
                    <input class="form-control" v-model="request.link" />
                </form-group>
                <form-group label="Source" field="source" :errors="errors">
                    <input class="form-control" v-model="request.source" />
                </form-group>
                <div class="form-group">
                    <button class="btn btn-primary form-control">Submit</button>
                </div>
            </form>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <th>Link</th>
                        <th>Source</th>
                        <th>Views</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in list" :key="i">
                            <td>{{item.link}}</td>
                            <td>{{item.source}}</td>
                            <td>{{item.views}}</td>
                            <td class="btn-group">
                                <button class="btn btn-sm btn-primary" @click="copy(item)"><font-awesome-icon icon="copy" /></button>
                                <button class="btn btn-sm btn-danger" @click="remove(item)"><font-awesome-icon icon="trash" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins} from "vue-property-decorator";
import {TrackedLinkService, TrackedLink, TrackedLinkRequest} from "@/services/trackedLink.service";
import ClipboardMixin from "./../mixins/ClipboardMixin";
import { HashMap } from "../services/base.service";
import FormGroup from "@/components/ui/forms/FormGroup.vue";

@Component({
    components: {
        FormGroup,
    }
})
export default class TrackedLinkManager extends Mixins(ClipboardMixin) {
    private service!: TrackedLinkService;
    private list: TrackedLink[] = [];

    private request!: TrackedLinkRequest;

    private errors: HashMap<string> = {};

    private async getList() {
        const res = await this.service.get();
        if (res.success) this.list = res.result;
    }

    private async remove(item: TrackedLink) {
        await this.service.delete(item.id);
        this.getList();
    }

    private async submit() {
        const res = await this.service.post(this.request);
        if (res.success) {
            this.clear();
            this.getList();
        } else {
            this.errors = res.error;
        }
    }

    private copy(item: TrackedLink) {
        this.copyToClipboard(item.link + "?src=" + item.encodedSource);
    }

    private clear() {
        this.request = {
            link: "",
            source: "",
        }
    }

    private created() {
        this.service = new TrackedLinkService();
        this.clear();
        this.getList();
    }
}
</script>