<template>
    <div class="form-group">
        <label class="primary-font">{{label}}</label>

        <slot></slot>
        
        <div class="invalid-feedback" style="display: block" v-if="errors.hasOwnProperty(field)">
            {{errors[field]}}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import StarRating from '@/components/ui/StarRating.vue';

@Component({components: {StarRating}})
export default class FormGroup extends Vue {
    @Prop()
    public label!: string;

    @Prop()
    public field!: string;

    @Prop()
    public type!: string;

    @Prop()
    public errors!: {[index: string]: string};

    private rating = 1;
}
</script>