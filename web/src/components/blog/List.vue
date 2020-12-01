<template> 
  <div>
      <div class="card mb-3" v-for="(item, i) in list" :key="i">
          <div class="row no-gutters">
            <div class="col-12 col-sm-4  mt-sm-4 pl-sm-3 mb-sm-4" v-if="item.imagePreview">
                <img :src="item.imagePreview.src" :alt="item.imagePreview.alt" />
            </div>
            <div class="col-12 col-sm-8">
                <div class="card-body">
                    <h4><router-link class="link-black" :to="{name: 'BlogPost', params: {id: item.slug}}">{{item.title}}</router-link></h4>
                    <p class='author'>{{item.authorName}} | <i>{{item.publishedAt | luxon}}</i></p>
                    <p>{{item.preview}}... <router-link :to="{name: 'BlogPost', params: {id: item.slug}}">Read More</router-link></p>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins, Prop} from "vue-property-decorator";
    import { User } from "../../services/auth.service";
    import { BlogPostListing } from "../../services/blog.service";


    @Component
    export default class BlogList extends Vue {
        @Prop()
        public list!: BlogPostListing[];
    }
</script>

<style scoped lang="scss">

    img {
        max-width: 100%;
        height: auto;
        width: auto\9; /* ie8 */
    }
</style>