import {IsString} from "class-validator";

export class UserFileDto {
    @IsString()
    public name: string;

    @IsString()
    public alt: string;

    public file: any;
}