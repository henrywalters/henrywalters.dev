import {IsEmail, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min} from "class-validator"

export class TestimonialLinkDto {
    @IsString()
    @IsNotEmpty({ message: "name Please provide a name" })
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({ message: "companyName Please provide a company name" })
    public companyName: string;
}

export class TestimonialDto {

    @IsString()
    @IsOptional({ message: "name Please provide a name" })
    public name: string;

    @IsEmail()
    @IsOptional()
    public email: string;

    @IsString()
    @IsOptional({ message: "companyName Please provide your company's name" })
    public companyName: string;

    @IsInt()
    @Min(1, { message: 'rating Please provide a rating'})
    @Max(5, { message: 'rating Please provide a rating'})
    public rating: number;

    @IsString({ message: 'testimonial Please provide a testimonial'})
    @IsNotEmpty({ message: 'testimonial Please provide a testimonial'})
    public testimonial: string;
}