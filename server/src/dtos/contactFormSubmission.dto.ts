import {IsEmail, IsString} from "class-validator"

export class ContactFormSubmissionDto {

    @IsString()
    public name: string = "";

    @IsEmail()
    public email: string;

    @IsString()
    public companyName: string;

    @IsString()
    public comments;

    public getName(): string { return this.name; }
}