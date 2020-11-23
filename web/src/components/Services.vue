<template>
    <div class="row">
        <h2 class='primary-font text-center col-12'>Services Offered</h2>
        <div class="col-md-6" v-for="(service, i) in services" :key="i">
            <div class="card mt-3">
                <div class="card-body">
                    <div class="card-title text-center">
                        <font-awesome-icon class="fa-2x icon" :icon="service.icon" />
                        <h4 class="primary-font mt-2"> {{service.title}}</h4>
                    </div>
                    <p class="card-text">{{service.summary}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "@/mixins/ConfigMixin";
    import TestimonialOutput from "@/components/TestimonialOutput.vue";

    interface IService {
        icon: string;
        title: string;
        summary: string;
    }

    @Component({
        name: "Services",
        components: {
            TestimonialOutput,
        }
    })
    export default class Services extends Mixins(ConfigMixin) {
        private initialized = true;
        private services: IService[] = [
            {
                icon: 'cogs',
                title: 'Legacy App Support',
                summary: `
                    Legacy applications are commonplace in business. We have years of experience making updates to 
                    existing applcations.
                `,
            },
            {
                icon: 'tools',
                title: 'Legacy App Modernization',
                summary:   `
                    Is your legacy application being bogged down with a poor user-experience? Our team will carefully 
                    analyze core components of your application and provide modern web or desktop interfaces to interact
                    with your legacy applications.
                `,
            },
            {
                icon: 'atom',
                title: 'Custom Software Solutions',
                summary: `
                    We have years of experience providing custom software solutions in a wide range of fields such as 
                    industrial, medical & food production. Simple, yet effective applications is at the core of our 
                    design process.
                `,
            },
            {
                icon: 'database',
                title: 'Database Administration',
                summary: 'We will help design, improve or create the perfect database for you.',
            }
        ]
    }
</script>

<style lang="scss" scoped>

    @import "@/assets/theme.scss";

    $nav-padding: 10px;

    .icon {
        color: $primaryColor;
    }

</style>