<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title primary-font">Files</h4>
        </div>
        <div class="card-body">
            <image-uploader @input="saved" ref="uploader" />
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <th>Preview</th>
                        <th>File Name</th>
                        <th>Alt Tag</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in list" :key="i">
                            <td>
                                <input id="file-upload" type="file" @change="fileUpload" v-if="editing && editingId === item.id"/>
                                <img :src="item.cdn" style="width: 100px; height: auto" v-else />
                            </td>
                            <td>
                                <input class="form-control" style="width: 200px" type="text" v-model="editing.name" v-if="editing && editingId === item.id" />
                                <span v-else>{{item.name}}</span>
                            </td>
                            <td>
                                <textarea class="form-control" style="width: 300px" v-model="editing.alt" v-if="editing && editingId === item.id"></textarea>
                                <span v-else>{{item.alt}}</span>
                            </td>
                            <td>
                                <div class="btn-group" v-if="editing && editingId === item.id">
                                    <button class='btn btn-sm btn-primary' @click='update' title='Save changes'>
                                        <font-awesome-icon icon="save" />
                                    </button>
                                    <button class='btn btn-sm btn-warning' @click='editing = null; editingId = null' title='Cancel editing'>
                                        <font-awesome-icon icon="ban" />
                                    </button>
                                </div>
                                <div class="btn-group" v-else>
                                    <button class='btn btn-sm btn-primary' @click='copyToClipboard(item.cdn)' title="copy to clipboard">
                                        <font-awesome-icon icon="copy"/>
                                    </button>
                                    <button class='btn btn-sm btn-warning' @click="edit(item)">
                                        <font-awesome-icon icon="edit" />
                                    </button>
                                    <button class='btn btn-sm btn-danger' @click='deleteFile(item.id)' title="Delete File">
                                        <font-awesome-icon icon="trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
import ImageUploader from "@/components/ui/ImageUploader.vue";
import { UserFileService, UserFile, UserFileRequest} from "../services/userFile.service";
import NotificationMixin from "../mixins/NotificationMixin";

@Component({
    components: {
        ImageUploader
    }
})
export default class UserFileManager extends Mixins(NotificationMixin) {
    private service!: UserFileService;

    private list: UserFile[] = [];

    private editing: UserFileRequest | null = null;
    private editingId: string | null = null;
    private editingError: string | null = null;
    private editingPreview: string;

    private async getList() {
        const res = await this.service.get();
        if (res.success) {
            this.list = res.result;
            console.log(this.list);
        }
    }

    private edit(item: UserFile) {
        this.editing = {
            name: item.name,
            alt: item.alt,
            file: null,
        }
        this.editingId = item.id;
    }

    private saved() {
        this.notifySuccess("File added");
        this.$refs.uploader.clearRequest();
        this.getList();
    }

    private async fileUpload(e: any) {
        this.editingError = null;
        if (e.target.files.length === 0) {
            this.editing.file = null;
        }

        this.editing.file = e.target.files[0];
        this.editingPreview = URL.createObjectURL(this.editing.file);
        this.editing.name = this.editing.file.name;
        console.log(this.editing);
    }

    private copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            this.notifySuccess("Copied to clipboard");
        }).catch(() => {
            this.notifyError("Failed to copy");
        })
    }

    private async deleteFile(id: string) {
        const res = await this.service.delete(id);
        if (res.success) {
            this.getList();
            this.notifySuccess("File deleted");
        } else {
            this.notifyError("Failed to delete file: " + res.error);
        }
    }

    private async update() {
        if (this.editingId) {
            const data = new FormData();
            data.append('name', this.editing.name);
            data.append('alt', this.editing.alt);
            data.append('file', this.editing.file);
            const res = await this.service.putFormData(this.editingId, data);
            if (res.success) {
                this.editing = null;
                this.editingId = null;
                this.notifySuccess('File updated');
                this.getList();
            } else {
                this.notifyError('Failed to update: ' + res.error);
            }
        }
    }

    private created() {
        this.service = new UserFileService();
        this.getList();
    }
}
</script>