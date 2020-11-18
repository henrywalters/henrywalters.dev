import {IsEmail, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min} from "class-validator"

export class TestimonialLinkDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public companyName: string;
}

export class TestimonialDto {

    @IsString()
    @IsOptional()
    public name: string;

    @IsEmail()
    @IsOptional()
    public email: string;

    @IsString()
    @IsOptional()
    public companyName: string;

    @IsInt()
    @Min(1)
    @Max(5)
    public rating: number;

    @IsString()
    @IsNotEmpty()
    public testimonial: string;
}