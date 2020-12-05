import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CommentDto {
    @IsString()
    @IsOptional()
    public parentCommentId?: string;

    @IsString()
    public body: string;

    @IsString()
    @IsOptional()
    public authorId?: string;

    @IsString()
    @IsOptional()
    public authorName?: string;

    @IsString()
    @IsOptional()
    public authorEmail?: string;
}