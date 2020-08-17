import {IsArray, IsInt, IsString} from "class-validator";

export class PostDto {
    @IsString()
    public title: string;

    @IsString()
    public body: string;

    @IsArray()
    public tags: string[];

    @IsInt()
    public categoryId: string;
}