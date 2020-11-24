import {Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards} from "@nestjs/common";
import {ResponseDto} from "../dtos/response.dto";
import {MailerService} from "@nestjs-modules/mailer";
import { TestimonialLinkDto, TestimonialDto } from "src/dtos/testimonial.dto";
import { Testimonial } from "src/entities/testimonial.entity";
import { AuthenticateFor } from "./../guards/authenticateFor.guard";
import {Privileges} from "./auth.controller";

@Controller("v1/testimonial")
export class TestimonialController {

    constructor(private readonly mailer: MailerService) {
    }

    // Create a new testiomonial link to be distrubted to client
    @Post()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN)) 
    public async newTestimonialLink(@Body() dto: TestimonialLinkDto) {
        try {
            const submission = new Testimonial();
            submission.name = dto.name;
            submission.email = dto.email;
            submission.companyName = dto.companyName;
            submission.anonymous = dto.anonymous;
            await submission.save();
            return ResponseDto.Success(submission);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Delete(":id")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteTestimonial(@Param("id") id: string) {
        try {
            const submission = await Testimonial.findOneOrFail(id);
            await submission.remove();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get('submitted')
    public async getTestimonials() {
        return ResponseDto.Success((await Testimonial.find({
            where: {
                submitted: true,
            }
        })).map((x) => {
            return x.anonymous ? x.makeAnonymous() : x.makeCleaned();
        }))
    }

    @Get()
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getAllTestimonials() {
        return ResponseDto.Success((await Testimonial.find()));
    }

    @Get(':id')
    public async getTestimonial(@Param("id") id: string) {
        return ResponseDto.Success((await Testimonial.findOneOrFail(id)));
    }

    // Submit a testiomonial
    @Post(":id")
    public async submitForm(@Param("id") id: string, @Body() dto: TestimonialDto) {
        try {
            const testimonial = await Testimonial.findOneOrFail(id);
            testimonial.name = dto.name;
            testimonial.email = dto.email;
            testimonial.companyName = dto.companyName;
            testimonial.rating = dto.rating;
            testimonial.testimonial = dto.testimonial;
            testimonial.anonymous = dto.anonymous;
            testimonial.submitted = true;
            await testimonial.save();
            return ResponseDto.Success(testimonial);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}