<template>
    <div class='container-fluid'>
        <div class='row'>
            <div class='col-12 col-lg-3 m-0'>
                <ul class='sidebar'>
                    <li 
                        v-for='(page, idx) in pages' 
                        :key='idx' 
                        class='sidebar-item m-0' 
                        :class='{active: activePage === page.key}'
                        @click='activePage = page.key'
                    ><font-awesome-icon :icon='page.icon' :style="{width: 50}"/> {{page.key}}</li>
                </ul>
            </div>

            <div class='col-12 col-lg-9'>
                <clients-index v-show='activePage == "Clients"' />
                <client-projects-index v-show='activePage == "Projects"' />
                <quotes-index v-show='activePage == "Quotes"' />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator"
import ClientsIndex from './clients/Index.vue'
import ClientProjectsIndex from './clients/projects/Index.vue'
import QuotesIndex from './quotes/Index.vue'

interface Page {
    key: string;
    icon: string;
}

@Component({
    components: {
        ClientsIndex,
        ClientProjectsIndex,
        QuotesIndex,
    }
})
export default class Accounting extends Vue {

    private pages: Page[] = [
        { key: 'Clients', icon: 'users' },
        { key: 'Projects', icon: 'project-diagram' },
        { key: 'Quotes', icon: 'quote-right' },
        { key: 'Invoices', icon: 'file-invoice-dollar' },
    ]

    private activePage: string = 'Clients';
}

</script>

<style lang="scss" scoped>

    @import "@/assets/theme.scss";

    ul {
        list-style-type: none;
    }

    .sidebar-item {
        font-weight: 700;
        font-size: 20px;
        cursor: pointer;
    }

    .sidebar-item:hover:not(.active)  {
        color: $primaryHoverColor;
    }

    .active {
        color: $primaryColor;
    }
    
</style>