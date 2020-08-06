import {Body, Controller, Post} from "@nestjs/common";
import {ContactFormSubmissionDto} from "../dtos/contactFormSubmission.dto";
import {ContactFormSubmission} from "../entities/contactFormSubmission.entity";
import {ResponseDto} from "../dtos/response.dto";

@Controller("v1/contact-form")
export class ContactFormController {
    @Post()
    public async submitForm(@Body() dto: ContactFormSubmissionDto) {
        try {
            const submission = new ContactFormSubmission();
            submission.name = dto.name;
            submission.email = dto.email;
            submission.companyName = dto.companyName;
            submission.comments = dto.comments;
            await submission.save();
            return ResponseDto.Success(submission);
        } catch (e) {
            ResponseDto.Error(e.message);
        }
    }
}