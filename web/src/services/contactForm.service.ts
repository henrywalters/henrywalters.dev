import BaseService, {ApiResponse, HashMap} from "@/services/base.service";

export interface ISubmissionForm {
    name: string;
    companyName: string;
    email: string;
    comments: string;
}
export default class ContactFormService extends BaseService<ISubmissionForm, void, HashMap<string>> {
    constructor() {
        super("Contact Form Service");
    }

    public async post(data: ISubmissionForm): Promise<ApiResponse<void, HashMap<string>>> {
        try {
            return (await this.http.post("contact-form", data)).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}