<template>
    <li class='comment pt-3 pb-3' :id="comment.id">
        <h5>
            {{comment.authorName}}
        </h5>
        <p class="text-muted">{{comment.createdAt | luxon}}</p>
        <markdown-viewer class="mt-3" v-model="comment.body"/>
        <button class="mt-3 btn btn-sm btn-primary" @click="responding = true" v-if="!responding">Reply</button>
        <button class="mt-3 btn btn-sm btn-warning" @click="responding = false" v-else>Cancel</button>
        <transition name="slide">
            <div class="row mt-3" v-if="responding">
                <comment-form 
                    :user="user"
                    :post="post"    
                    class="col-12" 
                    :can-cancel="true" 
                    :parent-comment="comment" 
                    @cancel="responding = false"
                    @update="responding = false; $emit('update')"
                />
            </div>
        </transition>
        <hr />
        <div class="row" v-if="comment.children.length > 0">
            <div class="col-1">
                <div class="thread-marker" />
            </div>
            <div class="col-11">
                <ul>
                    <comment-display
                        :user="user"
                        :post="post"        
                        v-for="(child, i) in comment.children" 
                        :key="i" 
                        :comment="child"
                        @update="$emit('update')"
                    />
                </ul>
            </div>
            <hr />
        </div>
        
    </li>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import Comments from "@/components/Comments.vue";
import CommentForm from "@/components/CommentForm.vue";
import { CommentPost } from "./CommentForm.vue";
import { User } from "../services/auth.service";
import MarkdownViewer from "@/components/ui/MarkdownViewer.vue";

@Component({
    name: "CommentDisplay",
    components: {
        Comments,
        CommentForm,
        MarkdownViewer,
    }
})
export default class CommentDisplay extends Vue {
    @Prop()
    public comment!: Comment;

    @Prop()
    public post!: CommentPost;

    @Prop()
    public user!: User;

    private responding: boolean = false;
}
</script>

<style scoped lang="scss">

    @import "@/assets/theme.scss";


    .focused {
        box-shadow: 0 0 10px 2px $secondaryColor;
        border: 2px solid $primaryGray;
        padding: 15px;
    }

    .thread-marker {
        box-shadow: 0 0 10px 1px $primaryColor;
        height: calc(100% - 40px);
        width: 2px;
        background-color:$primaryColor;
        margin: auto;
    }

    ul {
        list-style-image: none;
        list-style: none;
        list-style-type: none;
        
        margin-top: 15px;
        padding-left: 0;

        li {
            // padding-left: 0
        }
    }

    p, h5 {
        margin: 0;
    }

</style>