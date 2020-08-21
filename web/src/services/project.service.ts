import BaseService, {HashMap} from "@/services/base.service";
import {UserFile} from "@/services/userFile.service";

export interface ProjectDto {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    url?: string;
    sourceControlUrl?: string;
    videoUrl?: string;
    status: string;
    languages: string[];
    thumbnailId?: string;
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    url?: string;
    sourceControlUrl?: string;
    videoUrl?: string;
    status: string;
    languages: string[];
    thumbnail?: UserFile;
}

export class ProjectService extends BaseService<ProjectDto, Project, HashMap<string>> {
    constructor() {
        super("Project Service", "project");
    }
}