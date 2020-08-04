import {Body, Controller, Post} from "@nestjs/common";
import {ContactFormSubmissionDto} from "../dtos/contactFormSubmission.dto";
import {ContactFormSubmission} from "../entities/contactFormSubmission.entity";

@Controller("v1/contact-form")
export class ContactFormController {
    @Post()
    public async submitForm(@Body() dto: ContactFormSubmissionDto) {
        const submission = new ContactFormSubmission();
        submission.name = dto.name;
        submission.email = dto.email;
        submission.companyName = dto.companyName;
        submission.comments = dto.comments;
        await submission.save();
        return submission;
    }
}