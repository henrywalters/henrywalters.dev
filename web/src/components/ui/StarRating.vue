<template>
    <div>
        <span v-for="i in range" :key="i" @mouseenter="hoveredValue = i" @mouseleave="hoveredValue = null" @click="$emit('input', i)">
            <font-awesome-icon icon="star" class='fa-2x' v-if="(i <= value && hoveredValue == null) || (hoveredValue != null && i <= hoveredValue)" />
            <font-awesome-icon :icon="['far', 'star']" class='fa-2x' v-else />
        </span>
        
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class FormGroup extends Vue {
    @Prop()
    public value!: number;

    @Prop({type: Number, default: 1})
    public min!: number;

    @Prop({type: Number, default: 5})
    public max!: number;

    private range: number[] = [];

    private hoveredValue: number | null = null;

    @Watch('value')
    public valueChange() {
        console.log(this.value);
    }

    private created() {
        for (let i = this.min; i <= this.max; i++) {
            this.range.push(i);
        }
    }

    private selectValue(rating: number) {
        console.log(rating);
        this.$emit('input', rating);
    }
}
</script>

<style scoped lang="scss">
    div {
        color: #007bff;
        cursor: pointer;
    }
</style>