<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title primary-font">{{title}}</h3>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";


@Component
export default class Card extends Vue {
    @Prop()
    public title!: string;
    
}
</script>