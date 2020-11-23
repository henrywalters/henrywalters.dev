<template>
    <div>
        <span v-for="i in range" :key="i" @mouseenter="hoveredValue = i" @mouseleave="hoveredValue = null" @click="clicked(i)" :class="{clickable: !readOnly}">
            <font-awesome-icon icon="star" :class="'fa-' + size" v-if="(i <= value && (hoveredValue == null || readOnly)) || (hoveredValue != null && i <= hoveredValue && !readOnly)" />
            <font-awesome-icon :icon="['far', 'star']" :class="'fa-' + size" v-else />
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

    @Prop({type: Boolean, default: false})
    public readOnly!: boolean;

    @Prop({type: String, default: '2x'})
    public size!: string;

    private range: number[] = [];

    private hoveredValue: number | null = null;

    private clicked(i: number) {
        if (!this.readOnly) {
            this.$emit('input', i);
        }
    }

    private created() {
        for (let i = this.min; i <= this.max; i++) {
            this.range.push(i);
        }
    }

    private selectValue(rating: number) {
        this.$emit('input', rating);
    }
}
</script>

<style scoped lang="scss">
    div {
        color: #007bff;
        
    }

    .clickable {
        cursor: pointer;
    }
</style>