<template> 
    <div class="container">
        <div >
            <loader v-if="!initialized" />
            <div class="blog-post article" v-else-if="initialized && !editing">
                <div class="blog-post-title mt-3">
                    <h1 class="primary-font">{{post.title}}</h1>
                    <p>{{post.authorName ? post.authorName : post.author.firstName + ' ' + post.author.lastName}}</p>
                    <p class="text-muted">{{ post.publishedAt | luxon }}</p>
                </div>
                <markdown-viewer :value="post.content" :table-of-contents="true" :bookmarks="true" class="mt-5" />
            </div>
            <div class="row" v-else>
                <div class="col-md-8">
                    <form @submit.prevent="submit">
                        <form-group label="Title" field="title" :errors="errors">
                            <input class="form-control" v-model="request.title" @input="updateSlug" />
                        </form-group>
                        <div class="form-group">
                            <b>URL Preview: </b><i>/blog/{{request.slug}}</i>
                        </div>
                        <form-group label="Post Content" field="content" :errors="errors">
                            <markdown-editor v-model="request.content" />
                        </form-group>
                        <div class="form-group">
                            <button class="form-control btn btn-primary">Submit</button>
                        </div>
                        <div class="form-group" v-if="loading">
                            <loader />
                        </div>
                    </form>
                </div>
                <div class="col-md-4">
                    <h3 class="primary-font text-center">Categories</h3>
                    <div class="row">
                        <div class="col-8">
                            <label>Select Category</label>
                            <select class="form-control" v-model="selectedCategory">
                                <option :value="void 0"></option>
                                <option v-for="(cat, i) in categories" :key="i" :value="cat">{{cat.category}}</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <button class="form-control btn btn-primary " style="margin-top: 31px" @click="addCategory">Add</button>
                        </div>
                    </div>
                    <ul class="list-group mt-3">
                        <li class="list-group-item" v-for="(category, i) in request.categories" :key="i">
                            {{category.category}}
                            <button class="btn btn-danger float-right" @click="removeCategory(category)">X</button>
                        </li>
                    </ul>

                    <h3 class="primary-font text-center mt-5">Allowed to Edit</h3>
                    <div class="row">
                        <div class="col-8">
                            <label>Select User</label>
                            <select class="form-control" v-model="selectedUser">
                                <option :value="void 0"></option>
                                <option v-for="(user, i) in users" :key="i" :value="user">{{user.firstName}} {{user.lastName}}</option>
                            </select>
                        </div>
                        <div class="col-4">
                            <button class="form-control btn btn-primary " style="margin-top: 31px" @click="addUser">Add</button>
                        </div>
                    </div>
                    <ul class="list-group mt-3">
                        <li class="list-group-item" v-for="(user, i) in request.usersAllowedToEdit" :key="i">
                            {{user.firstName}} {{user.lastName}}
                            <button class="btn btn-danger float-right" @click="removeUser(user)">X</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import AuthMixin from "./../mixins/AuthMixin";
    import { BlogPostFull, BlogPostListing, BlogPostReadOnly, BlogService, UpdateBlogPostRequest } from "./../services/blog.service";
    import BlogList from "@/components/blog/List.vue";
    import { AuthService, User } from "../services/auth.service";
    import MarkdownViewer from "@/components/ui/MarkdownViewer.vue";
    import MarkdownEditor from "@/components/ui/MarkdownEditor.vue";
    import FormGroup from "@/components/ui/forms/FormGroup.vue";
    import {slugify} from "../services/slug.service";
    import { HashMap } from "../services/base.service";
    import CategoryService, { ICategory } from "../services/category.service";
    import NotificationMixin from "../mixins/NotificationMixin";
    import {UserService, MinimalUser} from "../services/user.service";
    import Set from "../structures/set.structure";

    interface BlogPostRequest {
    title: string;
    slug: string;
    content: string;
    usersAllowedToEdit: MinimalUser[];
    categories: ICategory[];
}

    @Component({
        components: {
            FormGroup,
            BlogList,
            MarkdownViewer,
            MarkdownEditor,
        }
    })
    export default class BlogPost extends Mixins(AuthMixin, NotificationMixin) {
        private initialized = false;
        private canCreate: boolean = false;
        private service!: BlogService;
        private user!: User;
        private post!: BlogPostReadOnly | BlogPostFull;

        private editing: boolean = false;

        private request!: BlogPostRequest;
        private errors: HashMap<string> = {};

        private loading: boolean = false;

        private users: MinimalUser[] = [];
        private categories: ICategory[] = [];

        private selectedUser: MinimalUser | null = null;
        private selectedCategory: ICategory | null = null;

        private canEdit() {
            if (!this.user) return false;
            if (!("author" in this.post)) return false;
            if (this.post.author.id === this.user.id) return true;
            if (this.post.allowedToEdit.filter(x => x.id === this.user.id).length > 0) return true;
            return false;
        }

        private updateSlug() {
            this.request.slug = slugify(this.request.title);
            this.$forceUpdate();
        }

        private async loadUsers() {
            const userService = new UserService();
            const res = await userService.get();
            if (res.success) this.users = res.result;
            console.log(this.users);
        }

        private async loadCategories() {
            const categoryService = new CategoryService();
            const res = await categoryService.get();
            if (res.success) this.categories = res.result;
            console.log(this.categories);
        }

        private addCategory() {
            if (this.selectedCategory) {
                const catSet = new Set<ICategory>((cat) => cat.id, this.request.categories);
                catSet.push(this.selectedCategory);
                this.selectedCategory = null;
                this.request.categories = catSet.self;
                this.$forceUpdate();
            }
        }

        private removeCategory(category: ICategory) {
            const catSet = new Set<ICategory>((cat) => cat.id, this.request.categories);
            catSet.remove(category);
            this.request.categories = catSet.self;
            this.$forceUpdate();
        }

        private addUser() {
            if (this.selectedUser) {
                const userSet = new Set<MinimalUser>((user) => user.id, this.request.usersAllowedToEdit);
                userSet.push(this.selectedUser);
                this.selectedUser = null;
                this.request.usersAllowedToEdit = userSet.self;
                this.$forceUpdate();
            }
        }

        private removeUser(user: MinimalUser) {
            const userSet = new Set<MinimalUser>((user) => user.id, this.request.usersAllowedToEdit);
            userSet.remove(user);
            this.request.usersAllowedToEdit = userSet.self;
            this.$forceUpdate();
        }

        private initRequest() {
            this.request = {
                title: this.post.title,
                slug: this.post.slug,
                content: this.post.content,
                usersAllowedToEdit: (this.post as BlogPostFull).allowedToEdit,
                categories: this.post.categories,
            };

            console.log(this.request);
        }

        private async created() {
            this.service = new BlogService();
            // @ts-ignore
            this.editing = this.$route.query.mode && this.$route.query.mode === 'edit';
            const res = await this.service.getOne(this.$route.params.id);
            if (res.success) {
                this.post = res.result as BlogPostReadOnly | BlogPostFull;

                if (this.editing) {
                    this.errors = {};
                    // @ts-ignore
                    this.user = await this.getSelf();
                    if (!this.canEdit()) {
                        this.$router.replace({name: 'Unauthorized'});
                    }
                    this.initRequest();
                    this.loadUsers();
                    this.loadCategories();
                }

            } else {
                this.$router.replace({name: 'PageNotFound'});
            }
            console.log(this.post);
            this.initialized = true;
        }
        
        private async save() {
            this.errors = {};
            this.loading = true;
            const res = await this.service.put((this.post as BlogPostFull).id, {
                ...this.request,
                usersAllowedToEditIds: this.request.usersAllowedToEdit.map(x => x.id),
                categoryIds: this.request.categories.map(x => x.id),
            });
            if (res.success) {
                this.notifySuccess("Post saved successfully");
            } else {
                this.notifyError("Failed to save post");
                this.errors = res.error;
            }
            this.loading = false;
        }

        private async submit() {
            this.save();
        }
    }
</script>

<style scoped lang="scss">
    .blog-post-title {
        p, h3 {
            margin: 0;
        }
    }

    .blog-post {}
</style>