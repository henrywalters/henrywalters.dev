<template>
    <card-collapsible title="Contact Forms">
        <div class="card-body">
            <contact-form-list :list="list"  @delete="deleteSubmission($event)"/>
        </div>
    </card-collapsible>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import NotificationMixin from "./../mixins/NotificationMixin";
    import ContactFormList from "@/components/ContactFormList.vue";
    import ContactFormService, { ISubmissionForm } from "../services/contactForm.service";
    import CardCollapsible from "@/components/ui/CardCollapsible.vue";


    @Component({
        components: {
            ContactFormList,
            CardCollapsible
        }
    })
    export default class ContactFormManager extends Mixins(NotificationMixin) {
        private service!: ContactFormService;
        private list: ISubmissionForm[] = [];

        private async getList() {
            const res = await this.service.get();
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