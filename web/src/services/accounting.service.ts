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


export enum QuoteStatus {
    PENDING = "Pending",
    INVOICED = "Invoiced",
    LOST = "Lost",
    VOID = "Void",
}

export interface QuoteItem {
    id: string;
    quoteItemId: string;
    title: string;
    description?: string;
    rate: number;
    quantity: number;
}

export interface Quote {
    id: string;
    quoteId: string;
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

export const CLIENT_PROJECT_STATUS_NAMES = [
    ClientProjectStatus.LEAD,
    ClientProjectStatus.QUOTED,
    ClientProjectStatus.IN_PROGRESS,
    ClientProjectStatus.COMPLETE,
    ClientProjectStatus.VOID,
];

export interface ClientProjectCreate {
    title: string;
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

export interface ClientProjectTaskWork {
    hours: number;
    notes: string;
}

export interface LoggedHours extends ClientProjectTaskWork {
    id: string;
    timestamp: string;
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

    public async quote(project: ClientProject): Promise<ApiResponse<Quote, string>> {
        return (await this.http.post(`${this.controllerPath}/${project.id}/quote`, {})).data;
    }

    public async invoice(project: ClientProject): Promise<ApiResponse<Invoice, string>> {
        return (await this.http.post(`${this.controllerPath}/${project.id}/invoice`, {})).data;
    }
}

export class ClientProjectTaskService extends BaseService<ClientProjectTaskCreate, ClientProjectTask, HashMap<string>> {
    constructor(projectId: string) {
        super("Client Project Service", `accounting/projects/${projectId}/tasks`);
    }

    public async workOn(task: ClientProjectTask, dto: ClientProjectTaskWork): Promise<ApiResponse<ClientProject, HashMap<string>>> {
        try {
            return (await this.http.post(`${this.controllerPath}/${task.id}/work`, dto)).data;
        } catch (e) {
            return {
                success: false,
                error: e.message,
            }
        }
    }
}

export class QuoteService extends BaseService<void, Quote, void> {
    constructor() {
        super("Quote Service", "accounting/quotes");
    } 
}

export class InvoiceService extends BaseService<void, Invoice, void> {
    constructor() {
        super("Invoice Service", "accounting/invoices");
    }
}
