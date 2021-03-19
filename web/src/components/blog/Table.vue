<template> 
  <div class="table-responsive">
      <table class="table table-sparce">
            <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td><indicator :color="item.live ? 'green' : 'red'" /></td>
                    <th><router-link class="link-black" :to="{name: 'BlogPost', params: {id: item.slug}}">{{item.title}}</router-link></th>
                    <td>
                        <div class="btn-group" role="group">
                            <button class='btn btn-sm btn-primary' @click="$emit('edit', item)">
                                <font-awesome-icon icon="edit" />
                            </button>
                            <button class='btn btn-sm btn-danger' @click="$emit('delete', item)" title="Delete Service"><font-awesome-icon icon="trash" /></button>
                        </div>
                    </td>
                    <td>
                        <button class='btn btn-sm btn-warning' v-if="item.live" @click='$emit("toggle-published", item)'>Save as Draft</button>
                        <button class='btn btn-sm btn-success' v-else @click='$emit("toggle-published", item)'>Publish</button>
                    </td>
                </tr>
            </tbody>
      </table>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins, Prop} from "vue-property-decorator";
    import { BlogPostListing } from "../../services/blog.service";
    import Indicator from "@/components/ui/Indicator.vue";


    @Component({
        components: {
            Indicator,
        }
    })
    export default class BlogTable extends Vue {
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