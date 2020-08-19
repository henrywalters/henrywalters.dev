<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Forum</h3>
        </div>
        <div class="body" v-if="initialized">
            <div class="row card mb-3" v-for="category in categories">
                <div class="card-header">
                    <h5 class="primary-font card-title">
                        {{category.category}}
                        <button v-if="canWrite" class="btn btn-info float-right" @click="$router.push({name: 'ForumPost', query: {c: category.id}})">New Post</button>
                    </h5>
                </div>
                <div class="card-body"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import CategoryService, {ICategory} from "@/services/category.service";
    import {AuthService, User} from "@/services/auth.service";
    import AuthMixin from "@/mixins/AuthMixin";
    import {AuthEventBus, AuthEvents} from "@/events";

    @Component({name: "Forum"})
    export default class Forum extends Mixins(AuthMixin) {
        private initialized = false;

        private categoryService!: CategoryService;
        private authService!: AuthService;

        private categories: ICategory[] = [];

        private user!: User | null;

        private async mounted() {
            this.categoryService = new CategoryService();
            this.authService = new AuthService();
            AuthEventBus.on(AuthEvents.Login, async (_) => {
                await this.getSelf();
            });

            AuthEventBus.on(AuthEvents.Logout, () => {
                this.user = null;
            })
            await this.refresh();
            await this.getSelf();
            this.initialized = true;
        }

        private get canWrite(): boolean {
            if (!this.user) return false;
            return AuthService.HasPrivilege(this.user, 'FORUM_WRITE');
        }

        private async getSelf() {
            const res = await this.authService.self();
            if (res.success) this.user = res.result;
        }

        private async refresh() {
            const res = await this.categoryService.get();
            if (res.success) this.categories = res.result;
        }
    }
</script>