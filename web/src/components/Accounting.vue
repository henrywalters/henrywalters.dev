<template>
    <div class='container-fluid'>
        <div class='row'>
            <div class='col-3 m-0'>
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

            <div class='col-9'>
                <clients-index v-show='activePage == "Clients"' />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator"
import ClientsIndex from './clients/Index.vue'

interface Page {
    key: string;
    icon: string;
}

@Component({
    components: {
        ClientsIndex,
    }
})
export default class Accounting extends Vue {

    private pages: Page[] = [
        { key: 'Clients', icon: 'users' },
        { key: 'Projects', icon: 'project-diagram' },
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