import BaseService, {ApiResponse, HashMap} from "@/services/base.service";

export interface ISubmissionForm {
    name: string;
    companyName: string;
    email: string;
    comments: string;
}

export default class ContactFormService extends BaseService<ISubmissionForm, ISubmissionForm, HashMap<string>> {
    constructor() {
        super("Contact Form Service", "contact-form");
    }
}