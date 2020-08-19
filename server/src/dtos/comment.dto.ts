import {IsOptional, IsString} from "class-validator";

export class CommentDto {
    @IsString()
    @IsOptional()
    public parentCommentId?: string;

    @IsString()
    public body: string;
}