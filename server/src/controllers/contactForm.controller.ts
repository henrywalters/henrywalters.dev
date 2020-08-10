import {Body, Controller, Post} from "@nestjs/common";
import {ContactFormSubmissionDto} from "../dtos/contactFormSubmission.dto";
import {ContactFormSubmission} from "../entities/contactFormSubmission.entity";
import {ResponseDto} from "../dtos/response.dto";
import {MailerService} from "@nestjs-modules/mailer";

@Controller("v1/contact-form")
export class ContactFormController {

    constructor(private readonly mailer: MailerService) {
    }

    @Post()
    public async submitForm(@Body() dto: ContactFormSubmissionDto) {
        try {
            const submission = new ContactFormSubmission();
            submission.name = dto.name;
            submission.email = dto.email;
            submission.companyName = dto.companyName;
            submission.comments = dto.comments;
            await submission.save();
            await this.mailer.sendMail({
                to: submission.email,
                from: '"Henry - Hadev.io" <henry@hadev.io>',
                subject: "Thanks For Reaching Out",
                html: `
                    <p>Hello ${submission.name}, thanks for reaching out to me! I will respond back as quickly as possible</p>
                `
            })
            return ResponseDto.Success(submission);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}