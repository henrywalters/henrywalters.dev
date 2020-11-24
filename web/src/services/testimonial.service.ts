import BaseService, { ApiResponse, HashMap } from './base.service';

export interface ITestimonial {
    name: string;
    email: string;
    companyName: string;
    anonymous: boolean;
    rating: number;
    testimonial: string;
    submitted: boolean;
}

export interface ITestimonialLinkDTO {
    name: string;
    email: string;
    companyName: string;
    anonymous: boolean;
}

export interface ITestimonialDTO {
    name: string;
    email: string;
    companyName: string;
    anonymous: boolean;
    rating: number;
    testimonial: string;
}

export class TestimonialService extends BaseService<ITestimonialLinkDTO, ITestimonial, HashMap<string>> {
    constructor() {
        super("Testimonial", "testimonial");
    }

    async getSubmitted() {
        try {
            return (await this.http.get(this.controllerPath + "/submitted")).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async submit(id: string, data: ITestimonialDTO): Promise<ApiResponse<void, HashMap<string>>> {
        try {
            return (await this.http.post(this.controllerPath + "/" + id, data)).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}