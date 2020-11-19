<template>
    <div class="form-group col-md-6">
        <label class="primary-font">{{label}}</label>
        <input 
            type="text" 
            class="form-control" 
            v-model="value" 
            :class="{'is-invalid': errors.hasOwnProperty(field)}" 
            v-if="type == 'text'" />
        <textarea 
            class="form-control" 
            rows="4" 
            v-model="value" 
            :class="{'is-invalid': errors.hasOwnProperty(field)}" 
            v-else-if="type == 'textarea'"></textarea>
        <div class="invalid-feedback" v-if="errors.hasOwnProperty(field)">
            {{errors[field]}}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"

@Component({})
export default class FormGroup extends Vue {
    @Prop()
    public label: string;

    @Prop()
    public field: string;

    @Prop()
    public value: string;

    @Prop()
    public type: string;

    @Prop()
    public errors: {[index: string]: string};
}
</script>