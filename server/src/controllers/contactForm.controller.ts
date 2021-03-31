import {Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards} from "@nestjs/common";
import {ContactFormSubmissionDto} from "../dtos/contactFormSubmission.dto";
import {ContactFormSubmission} from "../entities/contactFormSubmission.entity";
import {ResponseDto} from "../dtos/response.dto";
import {MailerService} from "@nestjs-modules/mailer";
import { AuthenticateFor } from "./../guards/authenticateFor.guard";
import {Privileges} from "../constants/privileges.constants";

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
            this.mailer.sendMail({
                to: submission.email,
                from: '"Henry Walters" <me@henrywalters.dev>',
                subject: "Thanks For Reaching Out",
                html: `
                    <p>Hey ${submission.name}, <p>
                    <p>thanks for reaching out! We will reach back out to you within 24 hours to discuss your project. If you want to get started today, give us a call!</p>
                    <br />
                    <p>Henry Walters</p>
                    <p><i>Coding - Math - Innovation<i><p>
                    <p><b>P:</b> +1 (734) 408-1548</p>
                    <p><b>W:</b> https://henrywalters.dev</p>
                `
            })
            return ResponseDto.Success(submission);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getSubmissions() {
        return ResponseDto.Success(await ContactFormSubmission.find());
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteSubmission(@Param("id") id: string) {
        try {
            const sub = await ContactFormSubmission.findOneOrFail(id);
            sub.remove();
            return ResponseDto.Success(void 0);
        } catch(e) {
            return ResponseDto.Error(e.message);
        }
    }
}