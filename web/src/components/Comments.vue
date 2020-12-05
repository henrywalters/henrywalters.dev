<template>
    <ul class='comments'>
        <comment-display 
            :user="user"
            :post="post"    
            v-for="(comment, i) in comments" 
            :key="i" 
            :comment="comment" 
            @update="$emit('update')"
        />
    </ul>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import CommentDisplay from "@/components/CommentDisplay.vue";
import { CommentPost } from "./CommentForm.vue";
import { User } from "../services/auth.service";

@Component({
    components: {
        CommentDisplay,
    }
})
export default class Comments extends Vue {
    @Prop()
    public comments!: Comment[];

    @Prop()
    public post!: CommentPost;

    @Prop()
    public user!: User;
}
</script>

<style scoped lang="scss">
    li.class, li.collapsed, li.expanded {
        list-style-image: none;
        list-style: none;
        list-style-type: none;
    }
    ul {
        list-style-image: none;
        list-style: none;
        list-style-type: none;
        padding-left: 10px;
    }


</style>