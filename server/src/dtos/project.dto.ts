import {IsArray, IsOptional, IsString} from "class-validator";
import {ProjectStatus} from "../entities/project.entity";

export class ProjectDto {
    @IsString()
    public title: string;

    @IsString()
    public shortDescription: string;

    @IsString()
    public longDescription: string;

    @IsString()
    @IsOptional()
    public url: string;

    @IsString()
    @IsOptional()
    public sourceControlUrl: string;

    @IsString()
    @IsOptional()
    public videoUrl: string;

    @IsString()
    public status: ProjectStatus;

    @IsArray()
    public languages: string[];

    @IsString()
    @IsOptional()
    public thumbnailId: string;
}