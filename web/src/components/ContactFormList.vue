<template>
    <div class="table-responsive">
        <table class="table" v-if="list">
            <thead>
                <th>Company</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comments</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>{{item.companyName}}</td>
                    <td>{{item.name}}</td>
                    <td><a :href="'mailto:' + item.email">{{item.email}}</a></td>
                    <td>{{item.comments}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class='btn btn-sm btn-danger' @click='deleteSubmission(item.id)' title="Delete Submission"><font-awesome-icon icon="trash" /></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import {mixins} from "vue-class-component"
    import NotificationMixin from "./../mixins/NotificationMixin";
    import { ISubmissionForm } from "../services/contactForm.service";


    @Component({
        name: "ContactFormList",
    })
    export default class TestimonialList extends Mixins(NotificationMixin) {
        @Prop()
        public list!: ISubmissionForm[];

        private copyToClipboard(text: string) {
            navigator.clipboard.writeText(text).then(() => {
                this.notifySuccess("Copied to clipboard");
            }).catch(() => {
                this.notifyError("Failed to copy");
            })
        }

        private async deleteSubmission(id: string) {
            this.$emit('delete', id);
        }
    }

</script>