<template>
    <card-collapsible title="Categories">
        <div class="row">
            <div class="col-9">
                <input class="form-control" type="text" v-model="category.category" placeholder="New Category"/>
            </div>
            <div class="col-3">
                <button class="btn btn-primary" @click="createCategory">+</button>
            </div>
        </div>
        <div v-if="error" class="error">
            {{error}}
        </div>

        <ul class="list-group col-md-12 w-100 mt-2">
            <li class="list-group-item" v-for="cat in categories" :key="cat.id">
                <span v-if="!isEditing(cat)">{{cat.category}}</span>
                <input type="text" v-if="isEditing(cat)" v-model="editing.category" />
                <div class="btn-group btn-group-sm float-right">
                    <button class="btn btn-info float-right" @click="editing = {...cat}"  v-if="!isEditing(cat)">Edit</button>
                    <button class="btn btn-danger float-right" @click="deleteCategory(cat.id)"  v-if="!isEditing(cat)">Delete</button>
                    <button class="btn btn-warning float-right" @click="editing = null"  v-if="isEditing(cat)">Cancel</button>
                    <button class="btn btn-primary float-right" @click="saveCategory" v-if="isEditing(cat)">Save</button>
                </div>
            </li>
        </ul>
    </card-collapsible>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import CategoryService, {CategoryDto, ICategory} from "@/services/category.service";
    import CardCollapsible from "@/components/ui/CardCollapsible.vue";

    @Component({
        components: {
            CardCollapsible,
        }
    })
    export default class CategoryManager extends Vue {
        private categoryService!: CategoryService;
        private categories: ICategory[] = [];
        private error = "";

        private editing: ICategory | null = null;
        private editingError = "";

        private category: CategoryDto = {
            category: "",
        }

        private mounted() {
            this.categoryService = new CategoryService();
            this.refresh();
        }

        private isEditing(category: any): boolean {
            // @ts-ignore
            return category && this.editing && category.id === this.editing.id;
        }

        private async refresh() {
            const res = await this.categoryService.get();
            if (res.success) this.categories = res.result;
        }

        private async createCategory() {
            const res = await this.categoryService.post(this.category);
            this.error = "";
            if (res.success) {
                this.category = {
                    category: "",
                }
                this.refresh();
            } else {
                this.error = res.error;
            }
        }

        private async saveCategory() {
            if (!this.editing) throw new Error("Editing is null");
            const res = await this.categoryService.put(this.editing.id, this.editing);
            this.editingError = "";
            if (res.success) {
                this.editing = null;
                this.refresh();
            } else {
                this.editingError = res.error;
            }
        }

        private async deleteCategory(id: string) {
            await this.categoryService.delete(id);
            this.refresh();
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>