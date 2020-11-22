<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title primary-font">Testimonials</h4>
        </div>
        <div class="card-body">
            <testimonial-link-form @create="getList" />
            <testimonial-list :list="list" @delete="deleteTestimonial($event)" />
        </div>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop, Mixins} from "vue-property-decorator";
    import TestimonialList from "@/components/TestimonialList.vue";
    import TestimonialLinkForm from "@/components/TestimonialLinkForm.vue";
    import {ITestimonial, ITestimonialDTO, TestimonialService} from "./../services/testimonial.service";
    import NotificationMixin from "./../mixins/NotificationMixin";


    @Component({
        name: "TestimonialManager",
        components: {
            TestimonialList,
            TestimonialLinkForm,
        }
    })
    export default class TestimonialManager extends Mixins(NotificationMixin) {
        private service!: TestimonialService;
        private list: ITestimonial[] = [];

        private async getList() {
            const res = await this.service.get();
            if (res.success) this.list = res.result;
        }

        private async deleteTestimonial(id: string) {
            try {
                await this.service.delete(id);
                this.notifySuccess("Testimonial deleted");
                this.getList();
            } catch (e) {
                this.notifyError("Failed to delete: " + e.message);
            }
        }

        private async created() {
            this.service = new TestimonialService();
            this.getList();
        }
    }

</script>