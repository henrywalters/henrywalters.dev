<template>
    <ul class='comments'>
        <comment-display v-for="(comment, i) in comments" :key="i" :comment="comment" />
    </ul>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import CommentDisplay from "@/components/CommentDisplay.vue";

@Component({
    components: {
        CommentDisplay,
    }
})
export default class Comments extends Vue {
    @Prop()
    public comments!: Comment[];
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