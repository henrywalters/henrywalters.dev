import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ServiceDTO {
    @IsString()
    @IsNotEmpty()
    public slug: string;

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public icon: string;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsString()
    @IsNotEmpty()
    public longDescription: string;
}