import { IsArray, IsNotEmpty, IsSemVer, IsString } from "class-validator";

export class CreateBlogPostDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public slug: string;
}

export class UpdateBlogPostDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public slug: string;

    @IsString()
    public content: string;

    @IsArray()
    public usersAllowedToEditIds: string[];

    @IsArray()
    public categoryIds: string[];
}