import {IsEmail, IsNotEmpty, IsString} from "class-validator"

export class ContactFormSubmissionDto {

    @IsString()
    @IsNotEmpty()
    public name: string = "";

    @IsEmail()
    public email: string;

    @IsString()
    public companyName: string;

    @IsString()
    public comments;
}