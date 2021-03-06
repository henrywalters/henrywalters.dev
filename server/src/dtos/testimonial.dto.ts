import {IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min} from "class-validator"
import { CreateDateColumn } from "typeorm";

export class TestimonialLinkDto {
    @IsString()
    @IsNotEmpty({ message: "name Please provide a name" })
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({ message: "companyName Please provide a company name" })
    public companyName: string;

    @IsBoolean()
    public anonymous: boolean;
}

export class TestimonialDto {
    @IsString()
    @IsNotEmpty({ message: "name Please provide your name" })
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({ message: "companyName Please provide your company's name" })
    public companyName: string;

    @IsBoolean()
    public anonymous: boolean;

    @IsInt()
    @Min(1, { message: 'rating Please provide a rating'})
    @Max(5, { message: 'rating Please provide a rating'})
    public rating: number;

    @IsString({ message: 'testimonial Please provide a testimonial'})
    @IsNotEmpty({ message: 'testimonial Please provide a testimonial'})
    public testimonial: string;
}