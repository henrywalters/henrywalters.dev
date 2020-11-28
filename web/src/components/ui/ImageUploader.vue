<template>
    <div class="image-uploader">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="row" v-if="file">
                    <div class="col-12 col-md-6 form-group">
                        <label>Image Name</label>
                        <input type="text" v-model="request.name" class="form-control" />
                    </div>
                    <div class="col-12 col-md-6 form-group">
                        <label>Alt Tag</label>
                        <input type="text" v-model="request.alt" class="form-control" />
                    </div>

                </div>
                <div class="col-12 form-group">
                    <label for="file-upload" class="custom-file-upload">
                        Upload Image <font-awesome-icon :icon="uploadIcon" />
                    </label>
                </div>
                <input id="file-upload" type="file" @change="fileUpload"/>
                <p class="image-uploader-error" v-if="error"></p>
            </div>
            <div class="col-12 col-md-4">
                <h5 class="text-center">Image Preview</h5>
                <div class="image-container" v-if="imagePreview">
                    <img :src="imagePreview" class="image-center"/>
                </div>
            </div>
            <div class="col-12 form-group">
                <button class="btn btn-info float-right" @click="save">Save Image</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from "vue-property-decorator";
    import {faUpload} from "@fortawesome/free-solid-svg-icons";
    import {UserFile, UserFileRequest, UserFileService} from "@/services/userFile.service";

    @Component({name: "ImageUploader"})
    export default class ImageUploader extends Vue {

        @Prop()
        public value!: UserFile;

        private uploadIcon = faUpload;
        private error: string | null = null;

        private request!: UserFileRequest;

        private service!: UserFileService;

        private file: any | null = null;

        private imagePreview: string | null = null;

        private mounted() {
            this.service = new UserFileService();

            if (this.value) {
                this.request = {
                    name: this.value.name,
                    alt: this.value.alt,
                    file: null,
                }

                this.imagePreview = this.value.cdn;
            }
        }

        private clearRequest() {
            this.request = {
                name: "",
                alt: "",
                file: null,
            }
            this.imagePreview = null;
        }

        private async fileUpload(e: any) {
            this.error = null;
            if (e.target.files.length === 0) {
                this.file = null;
            }

            this.file = e.target.files[0];
            this.imagePreview = URL.createObjectURL(this.file);
            console.log(this.imagePreview);
            this.clearRequest();
            this.request.name = this.file.name;
        }

        private async save() {

            const data = new FormData();
            data.append('name', this.request.name);
            data.append('alt', this.request.alt);
            data.append('file', this.file);

            const res = await this.service.postFormData(data);

            if (res.success) {
                this.$emit("input", res.result);
                this.clearRequest(); 
                this.$forceUpdate();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/theme.scss";
    #file-upload {
        display: none !important;
    }

    .custom-file-upload {
        border: 1px solid #ced4da;
        border-radius: .25rem;
        height: calc(1.5em + .75rem + 2px);
        display: inline-block;
        padding: .375rem .75rem;
        cursor: pointer;
        width: 100%;
        text-align: center;
    }

    .custom-file-upload:hover {
        background-color: lightgrey;
    }
</style>