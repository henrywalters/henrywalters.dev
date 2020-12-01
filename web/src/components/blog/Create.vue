<template> 
  <form @submit.prevent="submit">
      <form-group label="Title" field="title" :errors="errors">
          <input class="form-control" v-model="request.title" @input="updateSlug" />
      </form-group>
      <div class="form-group">
          <b>URL Preview: </b><i>/blog/{{request.slug}}</i>
      </div>
      <div class="form-group">
          <button class="form-control btn btn-primary">Create</button>
      </div>
  </form>
</template>

<script lang="ts">
import {Component, Vue, Mixins, Prop} from "vue-property-decorator";
import { CreateBlogPostRequest } from "../../services/blog.service";
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import SlugInput from "@/components/ui/SlugInput.vue";
import { HashMap } from "../../services/base.service";
import { BlogService } from "../../services/blog.service";
import {slugify} from "../../services/slug.service";

    @Component({
        components: {
            FormGroup,
            SlugInput,
        }
    })
    export default class BlogCreate extends Vue {
        private request!: CreateBlogPostRequest;
        private errors!: HashMap<string>;
        private service!: BlogService;

        private clear() {
            this.errors = {};
            this.request = {
                title: "",
                slug: "",
            }
        }

        private async submit() {
            const res = await this.service.post(this.request);
            this.errors = {};
            if (res.success) {
                this.clear();
                this.$emit('create', res.result);
            } else {
                this.errors = res.error;
            }
            this.$forceUpdate();
        }

        private updateSlug() {
            this.request.slug = slugify(this.request.title);
            this.$forceUpdate();
        }

        private created() {
            this.service = new BlogService();
            this.clear();
        }
    }
</script>

<style scoped lang="scss">

    img {
        max-width: 100%;
        height: auto;
        width: auto\9; /* ie8 */
    }
</style>