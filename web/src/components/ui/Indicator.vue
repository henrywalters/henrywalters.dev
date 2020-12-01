<template>
    <div class="indicator" :style="{'background-color': color}"></div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";


@Component({
    components: {
    }
})
export default class Indicator extends Vue {
    @Prop()
    public color!: string;
}
</script>

<style scoped lang="scss">
    .indicator {
        margin-top: 8px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
</style>