<template>
    <div class="container-fluid" v-if="authorized">
        <div class="header">
            <h3 class="primary-font text-center">Administration</h3>
        </div>
        <div class="body">
            <site-metrics />
            <div class="row mt-3">
                <div class="col-lg-7">
                    <service-manager class="mt-3"/>
                    <project-manager class="mt-3"/>
                    <tracked-link-manager class="mt-3" />
                    <testimonial-manager class="mt-3" />
                </div>
                <div class="col-lg-5">
                    <category-manager class="mt-3" />
                    <contact-form-manager class="mt-3" />
                    <user-file-manager class="mt-3" />
                </div>
            </div>
            <div class="row mt-3">
                <div class='col-12'>
                    <div class='card'>
                        <div class='card-header'>
                            <h4 class='card-title'>Accounting</h4>
                        </div>
                        <div class='card-body'>
                            <accounting />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Vue} from "vue-property-decorator";
    import CategoryManager from "./../components/CategoryManager.vue";
    import ProjectManager from "./../components/ProjectManager.vue";
    import TestimonialManager from "./../components/TestimonialManager.vue";
    import ContactFormManager from "./../components/ContactFormManager.vue";
    import SiteMetrics from "../components/SiteMetrics.vue";
    import ServiceManager from "./../components/ServiceManager.vue";
    import UserFileManager from "./../components/UserFileManager.vue";
    import TrackedLinkManager from "./../components/TrackedLinkManager.vue";
    import AuthMixin from "../mixins/AuthMixin";
    import ClientsList from "./../components/clients/List.vue";
    import Accounting from "./../components/Accounting.vue"

    @Component({
        name: "Admin", 
        components: {
            CategoryManager, 
            ProjectManager, 
            TestimonialManager, 
            ContactFormManager,
            SiteMetrics,
            ServiceManager,
            UserFileManager,
            TrackedLinkManager,
            ClientsList,
            Accounting,
        }
    })
    export default class Admin extends Mixins(AuthMixin) {
        private async created() {
            await this.authorizeFor('ADMIN');
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme.scss";
</style>