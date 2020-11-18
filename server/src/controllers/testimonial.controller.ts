import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {ResponseDto} from "../dtos/response.dto";
import {MailerService} from "@nestjs-modules/mailer";
import { TestimonialLinkDto, TestimonialDto } from "src/dtos/testimonial.dto";
import { Testimonial } from "src/entities/testimonial.entity";

@Controller("v1/testimonial")
export class TestimonialController {

    constructor(private readonly mailer: MailerService) {
    }

    // Create a new testiomonial link to be distrubted to client
    @Post()
    public async newTestimonialLink(@Body() dto: TestimonialLinkDto) {
        try {
            const submission = new Testimonial();
            submission.name = dto.name;
            submission.email = dto.email;
            submission.companyName = dto.companyName;
            await submission.save();
            return ResponseDto.Success(submission);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get()
    public async getCompletedTestimonials() {
        return ResponseDto.Success(await Testimonial.find({
            where: {
                submitted: true,
            }
        }));
    }

    @Get(":id")
    public async getTestimonial(@Param("id") id: string) {
        try {
            return ResponseDto.Success(await Testimonial.findOneOrFail(id));
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    // Submit a testiomonial
    @Post(":id")
    public async submitForm(@Param("id") id: string, @Body() dto: TestimonialDto) {
        try {
            const testimonial = await Testimonial.findOneOrFail(id);
            testimonial.rating = dto.rating;
            testimonial.testimonial = dto.testimonial;
            await testimonial.save();
            return ResponseDto.Success(testimonial);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}