import { IsNotEmpty, IsString } from "class-validator";

export class TrackedLinkDto {
    @IsString()
    @IsNotEmpty()
    public link: string;

    @IsString()
    @IsNotEmpty()
    public source: string;
}