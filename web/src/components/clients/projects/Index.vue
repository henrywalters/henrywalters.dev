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