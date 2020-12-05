<template>
    <li class='comment pt-3 pb-3'>
        <h5>{{comment.authorName}}</h5>
        <p class="text-muted">{{comment.createdAt | luxon}}</p>
        <p class="mt-3">{{comment.body}}</p>
        <button class="mt-3 btn btn-sm btn-primary" @click="responding = true">Reply</button>
        <transition name="slide">
            <div class="row mt-3" v-if="responding">
                <comment-form class="col-12" :can-cancel="true" :parent-comment="comment" @cancel="responding = false"/>
            </div>
        </transition>
        <hr />
        <div class="row" v-if="comment.children.length > 0">
            <div class="col-1">
                <div class="thread-marker" />
            </div>
            <div class="col-11">
                <ul>
                    <comment-display v-for="(child, i) in comment.children" :key="i" :comment="child" />
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

@Component({
    components: {
        Comments,
        CommentForm,
    }
})
export default class CommentDisplay extends Vue {
    @Prop()
    public comment!: Comment;

    private responding: boolean = false;
}
</script>

<style scoped lang="scss">

    @import "@/assets/theme.scss";

    .comment {
        // border: 1px solid black;
    }

    .thread-marker {
        box-shadow: 0 0 10px 1px $primaryColor;
        height: calc(100% - 40px);
        width: 2px;
        background-color:$primaryColor;
        margin-top: 20px;
    }

    ul {
        list-style-image: none;
        list-style: none;
        list-style-type: none;
        
        margin-top: 15px;
        

        li {
            // padding-left: 0
        }
    }

    p, h5 {
        margin: 0;
    }

</style>