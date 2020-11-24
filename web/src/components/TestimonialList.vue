<template>
    <div class="table-responsive">
        <table class="table" v-if="list">
            <thead>
                <th>Company</th>
                <th>Name</th>
                <th>Email</th>
                <th>Anonymous?</th>
                <th>Submitted?</th>
                <th>Rating</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="(item, i) in list" :key="i">
                    <td>{{item.companyName}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.email}}</td>
                    <td>{{ item.anonymous ? 'Yes' : 'No' }}</td>
                    <td>{{ item.submitted ? 'Yes' : 'No' }}</td>
                    <td>{{ item.rating ? item.rating : 'N/A'}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class='btn btn-sm btn-primary' @click='copyToClipboard(buildUrl(item.id))' title="copy to clipboard"><font-awesome-icon icon="copy"/></button>
                            <button class='btn btn-sm btn-danger' @click='deleteTestimonial(item.id)' title="Delete Testimonial"><font-awesome-icon icon="trash" /></button>
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
    import FormGroup from "@/components/ui/forms/FormGroup.vue";
    import {ITestimonial, ITestimonialDTO, TestimonialService} from "./../services/testimonial.service";
    import {HashMap} from "./../services/base.service";
    import NotificationMixin from "./../mixins/NotificationMixin";


    @Component({
        name: "TestimonialList",
        components: {
            FormGroup,
        }
    })
    export default class TestimonialList extends Mixins(NotificationMixin) {
        @Prop()
        public list!: ITestimonial[];

        private buildUrl(id: string) {
            return process.env.VUE_APP_WEB_ROOT + '/testimonial/' + id;
        }

        private copyToClipboard(text: string) {
            navigator.clipboard.writeText(text).then(() => {
                this.notifySuccess("Copied to clipboard");
            }).catch(() => {
                this.notifyError("Failed to copy");
            })
        }

        private async deleteTestimonial(id: string) {
            this.$emit('delete', id);
        }
    }

</script>