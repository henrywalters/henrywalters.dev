<template> 
  <div :class="{'container': !canCreate, 'container-fluid': canCreate}">
    <h1 class="primary-font text-center">Blog</h1>
    <div :class="{'article': !canCreate}">
        <div class="row" >
            <div class="col-md-4" v-if="canCreate">
                <h4>My Blog</h4>
                <div class="card">
                    <div class="card-body">
                        <blog-create @create="getMyPosts(); getRecentPosts();"/>
                        <blog-table :list="myPosts" @edit="editPost" @delete="deletePost" @toggle-published="togglePublished" />
                    </div>
                </div>
            </div>
            <div class="mt-3" :class="{'col-md-8': canCreate, 'col-12': !canCreate}">
                <h4>Recent Posts</h4>
                <blog-list :list="recentPosts" v-if="!loadingPosts" />
                <loader v-else />
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import AuthMixin from "./../mixins/AuthMixin";
    import { BlogPostFull, BlogPostListing, BlogService } from "./../services/blog.service";
    import BlogList from "@/components/blog/List.vue";
    import BlogTable from "@/components/blog/Table.vue";
    import BlogCreate from "@/components/blog/Create.vue";
    import { AuthService, User } from "../services/auth.service";

    @Component({
        components: {
            BlogList,
            BlogTable,
            BlogCreate,
        }
    })
    export default class Blog extends Mixins(AuthMixin) {
        private initialized = false;
        private canCreate: boolean = false;
        private service!: BlogService;
        private user!: User;

        private recentPosts: BlogPostListing[] = [];
        private myPosts: BlogPostListing[] = [];

        private loadingPosts: boolean = false;
        private loadingMyPosts: boolean = false;

        private async getRecentPosts() {
            this.loadingPosts = true;
            const res = await this.service.get();
            if (res.success) this.recentPosts = res.result as BlogPostListing[];
            this.loadingPosts = false;
        }

        private async getMyPosts() {
            this.loadingMyPosts = true;
            const res = await this.service.getMine();
            if (res.success) this.myPosts = res.result as BlogPostListing[];
            console.log(this.myPosts);
            this.loadingMyPosts = false;
        }

        private async togglePublished(post: BlogPostListing) {
            await this.service.togglePublished(post.slug);
            this.getMyPosts();
            this.getRecentPosts();
        }

        private async deletePost(post: BlogPostListing) {
            await this.service.delete(post.slug);
            this.getMyPosts();
            this.getRecentPosts();
        }

        private async editPost(post: BlogPostListing) {
            const fullPostRes = await this.service.getOne(post.slug);
            if (!fullPostRes.success) throw new Error("Can not edit");
            const fullPost = fullPostRes.result as BlogPostFull;
            this.$router.push({name: 'BlogPost', params: {id: fullPost.id }, query: {mode: 'edit'}});
        }

        private async created() {
            this.service = new BlogService();
            this.getRecentPosts();
            // @ts-ignore
            this.user = await this.getSelf();
            this.canCreate = AuthService.HasPrivilege(this.user, this.PRIVILEGES.BLOG_WRITE);
            this.getMyPosts();
            this.initialized = true;
        }
    }
</script>

<style scoped lang="scss">

</style>