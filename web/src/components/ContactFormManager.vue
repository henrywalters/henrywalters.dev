<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title primary-font">Contact Forms</h4>
        </div>
        <div class="card-body">
            <contact-form-list :list="list"  @delete="deleteSubmission($event)"/>
        </div>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import NotificationMixin from "./../mixins/NotificationMixin";
    import ContactFormList from "@/components/ContactFormList.vue";
    import ContactFormService, { ISubmissionForm } from "../services/contactForm.service";


    @Component({
        components: {
            ContactFormList,
        }
    })
    export default class ContactFormManager extends Mixins(NotificationMixin) {
        private service!: ContactFormService;
        private list: ISubmissionForm[] = [];

        private async getList() {
            const res = await this.service.get();
            console.log(res);
            if (res.success) this.list = res.result;
        }

        private async deleteSubmission(id: string) {
            try {
                const res = await this.service.delete(id);
                if (res.success) {
                    this.notifySuccess("Testimonial deleted");
                    this.getList();
                } else {
                    this.notifyError("Failed to delete: " + res.error);
                }
            } catch (e) {
                this.notifyError("Failed to delete: " + e.message);
            }
        }

        private async created() {
            this.service = new ContactFormService();
            this.getList();
        }
    }

</script>