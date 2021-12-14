<template>
    <form @submit.prevent='submit'>
        <div class='row'>
            <form-group class='col-md-8' label='Notes' field='notes' :errors='errors'>
                <textarea class='form-control' v-model='request.notes' rows='2' />
            </form-group>
            <form-group class='col-md-4' label='Hours' field='hours' :errors='errors'>
                <input class='form-control' type='number' min='0' step='0.125' v-model.number='request.hours' />
            </form-group>
            
        </div>
        <div class='row'>
            <div class='col-12 btn-group'>
                <button class='btn btn-warning btn-sm' @click.prevent='$emit("cancel")' :disabled='loading'>
                    Cancel
                </button>
                <button class='btn btn-primary btn-sm' @click='submit' :disabled='loading'>
                    <font-awesome-icon icon='clock' :spin='loading' /> Log Time
                </button>
            </div>
        </div>
    </form>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { ClientProject, ClientProjectService, ClientProjectTask, ClientProjectTaskService, ClientProjectTaskWork } from '../../../../services/accounting.service';
import { HashMap } from '../../../../services/base.service';

@Component({})
export default class LogHoursForm extends Vue {

    @Prop()
    public project!: ClientProject;

    @Prop()
    public task!: ClientProjectTask;

    api: ClientProjectTaskService;

    request: ClientProjectTaskWork = {
        notes: '',
        hours: 0,
    }

    loading = false;
    errors: HashMap<string> = {};

    created() {
        this.api = new ClientProjectTaskService(this.project.id);
    }

    async submit() {
        this.loading = true;
        const res = await this.api.workOn(this.task, this.request);
        if (res.success === true) {
            this.request = {
                notes: '',
                hours: 0,
            }
            this.$emit('success', res.result);
        } else {
            this.errors = res.error;
        }
        this.loading = false;
    }

}

</script>

<style lang="scss" scoped>

</style>