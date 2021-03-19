<template>
    <div class='comment-form'>
        <h4 v-if="parentComment">Replying to {{parentComment.authorName}}</h4>
        <h4 v-else>Leave a comment</h4>
        <form @submit.prevent="submit" class="mt-3">
            <div class="row">
                <form-group class="col-md-6" label="Your name" field="authorName" :errors="errors" v-if="!user">
                    <input class="form-control" v-model="request.authorName" @change="$emit('input', request)"/>
                </form-group>
                <form-group class="col-md-6" label="Your email" field="authorEmail" :errors="errors" v-if="!user">
                    <input class="form-control" v-model="request.authorEmail" @change="$emit('input', request)" />
                </form-group>
                <form-group class="col-md-12" label="Comment" field="body" :errors="errors">
                    <markdown-editor rows="4" v-model="request.body" @change="$emit('input', request)" v-if="user" />
                    <textarea rows="4" class="form-control" v-model="request.body" @change="$emit('input', request)" v-else />
                </form-group>
                <div class="col-12">
                    <div class="form-group btn-group w-100">
                        <button class="form-control btn btn-primary">Submit</button>
                        <button class="form-control btn btn-warning" @click.prevent="$emit('cancel')" v-if="canCancel">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
        <loader v-if="loading" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Mixins} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import { CommentRequest, Comment } from "../services/blog.service";
import { ApiResponse, HashMap } from "../services/base.service";
import NotificationMixin from "../mixins/NotificationMixin";
import MarkdownEditor from "@/components/ui/MarkdownEditor.vue";
import { IUser } from "hauth-lib/dist/interfaces/user";

export type CommentPost = (req: CommentRequest) => Promise<ApiResponse<any, HashMap<string>>>;

@Component({
    components: {
        FormGroup,
        MarkdownEditor,
    }
})
export default class CommentDisplay extends Mixins(NotificationMixin) {
    @Prop()
    public parentComment!: Comment;

    @Prop({type: Boolean, default: false})
    public canCancel!: boolean;

    @Prop()
    public post!: CommentPost;

    @Prop()
    public user!: IUser;

    private errors: HashMap<string> = {};
    private request!: CommentRequest;
    private loading: boolean = false;

    private reset() {
        this.errors = {};
        this.request = {
            body: "",
        }

        if (this.user) {
            this.request.authorId = this.user.id;
        } else {
            this.request.authorName = "";
            this.request.authorEmail = "";
        }

        if (this.parentComment) {
            this.request.parentCommentId = this.parentComment.id;
        }
    }

    private async submit() {
        this.loading = true;
        const res = await this.post(this.request);
        this.loading = false;

        if (res.success === true) {
            this.reset();
            this.$forceUpdate();
            this.notifySuccess("Comment added successfully");
            this.$emit('update');
        } else {
            this.errors = res.error;
            this.notifyError("Failed to leave comment");
        }
    }

    private created() {
        this.reset();
    }
}
</script>

<style scoped lang="scss">

</style>