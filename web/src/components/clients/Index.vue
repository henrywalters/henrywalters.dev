<template>
    <div class='container-fluid'>
        <modal title="New Client" :isOpen='formOpen' @close='cancelEdit'>
            <clients-form :client='editing' @success='success' />
        </modal>
        <modal title="Client Address Book" :isOpen='addressFormOpen' @close='cancelEdit' size='lg' >
            <client-addresses :client='editing' @update='refresh' />
        </modal>
        <h2>Clients <button class='btn btn-primary btn-sm float-right' @click='create'><font-awesome-icon icon='plus' /> Create</button></h2>
        <clients-list :clients='clients' @edit='editClient' @remove='removeClient' @edit-addresses="editAddresses" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Mixins} from "vue-property-decorator";
    import ConfigMixin from "./../../mixins/ConfigMixin";
    import {Client, ClientCreate, ClientService} from "./../../services/accounting.service"
    import ClientsList from './List.vue'
    import ClientsForm from './Form.vue';
    import ClientAddresses from './Addresses.vue';

    @Component({
        components: {
            ClientsList,
            ClientsForm,
            ClientAddresses,
        }
    })
    export default class ClientsIndex extends Mixins(ConfigMixin) {
        
        formOpen: boolean = false;
        addressFormOpen: boolean = false;
        editing: Client | null = null;
        clients: Client[] = [];

        api!: ClientService;

        async created() {
            this.api = new ClientService();
            await this.refresh();
        }

        async refresh() {
            const res = await this.api.get();
            if (res.success) {
                this.clients = res.result;
                if (this.editing) {
                    for (const client of this.clients) {
                        if (client.id === this.editing.id) {
                            this.editing = client;
                        }
                    }
                }
                
            }
        }

        cancelEdit() {
            this.editing = null;
            this.formOpen = false;
            this.addressFormOpen = false;
        }

        async success() {
            this.editing = null;
            this.formOpen = false;
            await this.refresh();
        }

        create() {
            this.formOpen = true;
            this.editing = null;
        }

        editClient(client: Client) {
            this.editing = {...client};
            this.formOpen = true;
        }

        editAddresses(client: Client) {
            this.editing = {...client};
            this.addressFormOpen = true;
        }

        async removeClient(client: Client) {
            if (confirm("Are you sure you want to delete " + client.name + "? This action can not be undone")) {
                if (client.id) await this.api.delete(client.id);
                await this.refresh();
            }
            
        }
    }
</script>

<style scoped lang="scss">

</style>