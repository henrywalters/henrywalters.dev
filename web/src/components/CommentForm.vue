<template>
    <div class='comment-form'>
        <h4 v-if="parentComment">Replying to {{parentComment.authorName}}</h4>
        <h4 v-else>Leave a comment</h4>
        <form @submit.prevent="$emit('submit', request)" class="mt-3">
            <div class="row">
                <form-group class="col-md-6" label="Your name" field="authorName" :errors="errors">
                    <input class="form-control" v-model="request.authorName" @change="$emit('input', request)"/>
                </form-group>
                <form-group class="col-md-6" label="Your email" field="authorEmail" :errors="errors">
                    <input class="form-control" v-model="request.authorEmail" @change="$emit('input', request)" />
                </form-group>
                <form-group class="col-md-12" label="Comment" field="body" :errors="errors">
                    <textarea rows="4" class="form-control" v-model="request.body" @change="$emit('input', request)" />
                </form-group>
                <div class="col-12">
                    <div class="form-group btn-group w-100">
                        <button class="form-control btn btn-primary">Submit</button>
                        <button class="form-control btn btn-warning" @click="$emit('cancel')">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
        <loader v-if="loading" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import { CommentRequest, Comment } from "../services/blog.service";
import { HashMap } from "../services/base.service";

@Component({
    components: {
        FormGroup,
    }
})
export default class CommentDisplay extends Vue {
    @Prop()
    public parentComment!: Comment;

    @Prop()
    public errors!: HashMap<string>;

    @Prop()
    public value!: CommentRequest;

    @Prop()
    public loading!: boolean;

    @Prop({type: Boolean, default: false})
    public canCancel!: boolean;

    private request!: CommentRequest;

    private reset() {
        this.errors = {};
        this.request = this.value ? this.value : {
            body: "",
            authorName: "",
            authorEmail: "",
        }

        if (this.parentComment) {
            this.request.parentCommentId = this.parentComment.id;
        }
    }

    private created() {
        this.reset();
    }

    @Watch('loading')
    public loadingChange() {
        console.log("this.loading");
        this.$forceUpdate();
    }

    @Watch('value', {deep: true})
    public valueChange() {
        this.reset();
        this.$forceUpdate();
    }

}
</script>

<style scoped lang="scss">

</style>