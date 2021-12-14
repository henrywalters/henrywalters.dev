import BaseService, { ApiResponse, HashMap } from "./base.service";

export interface AddressCreate {
    streetAddress: string;
    unitType?: string;
    unitNumber?: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Address {
    id: string;
    streetAddress: string;
    unitType?: string;
    unitNumber?: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface ClientCreate {
    name: string;
    rate: number;
    contactName?: string;
    contactEmail?: string;
    phone: string;
    invoicePrefix?: string;
}

export interface ClientAddresses {
    billingAddressId?: string;
    shippingAddressSameAsBilling?: boolean;
    shippingAddressId?: string;
}

export interface Client {
    id: string;
    name: string;
    rate: number;
    contactName?: string;
    contactEmail?: string;
    phone: string;
    invoicePrefix?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
}

export interface InvoiceItem {
    id: string;
    invoiceItemId: string;
    title: string;
    description?: string;
    rate: number;
    quantity: number;
}

export interface Payment {
    id: string;
    amount: number;
    timestamp: string;
}

export enum InvoiceStatus {
    INVOICED = "Invoiced",
    PAID = "Paid",
    VOID = "Void",
}

export interface Invoice {
    id: string;
    invoiceId: string;
    date: string;
    client: Client;
    amountPaid: number;
    status: InvoiceStatus;
    items: InvoiceItem[];
    payments: Payment[];
}

export enum ClientProjectStatus {
    LEAD = "Lead",
    QUOTED = "Quoted",
    IN_PROGRESS = "In Progress",
    COMPLETE = "Complete",
    VOID = "Void",
}

export interface ClientProjectCreate {
    title: string;
    createdOn: string;
    status: ClientProjectStatus;
    clientId: string;
}

export interface ClientProject {
    id: string;
    client: Client;
    title: string;
    createdOn: string;
    status: ClientProjectStatus;
    tasks: ClientProjectTask[];
}

export interface ClientProjectTaskCreate {
    title: string;
    description?: string;
    complete: boolean;
    estimatedHours: number;
}

export interface ClientProjectTask extends ClientProjectTaskCreate {
    id: string;
    actualHours: number;
    billedHours: number;
}

export class ClientService extends BaseService<ClientCreate, Client, HashMap<string>> {
    constructor() {
        super("Client Service", "accounting/clients");
    }

    public async setActiveAddresses(id: string, body: ClientAddresses): Promise<ApiResponse<Client, HashMap<string>>> {
        try {
            return (await this.http.post(this.controllerPath + '/' + id + '/active-addresses', body)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}

export class ClientAddressService extends BaseService<AddressCreate, Address, HashMap<string>> {
    constructor(clientId: string) {
        super("Client Address Service", `accounting/clients/${clientId}/addresses`);
    }
}

export class ClientProjectService extends BaseService<ClientProjectCreate, ClientProject, HashMap<string>> {
    constructor() {
        super("Client Project Service", 'accounting/projects');
    }
}

export class ClientProjectTaskService extends BaseService<ClientProjectTaskCreate, ClientProjectTask, HashMap<string>> {
    constructor(projectId: string) {
        super("Client Project Service", `accounting/projects/${projectId}/tasks`);
    }

    public async workOn(task: ClientProjectTask, hours: number): Promise<ApiResponse<ClientProject, HashMap<string>>> {
        try {
            return (await this.http.post(this.controllerPath + '/', {hours})).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}


export class InvoiceService extends BaseService<void, Invoice, void> {
    constructor() {
        super("Invoice Service", "accounting/invoices");
    }
}
