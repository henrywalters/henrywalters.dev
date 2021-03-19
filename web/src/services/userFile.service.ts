import BaseService from "@/services/base.service";


export interface UserFile {
    id: string;
    name: string;
    alt: string;
    cdn: string;
    cdnId: string;
}

export interface UserFileRequest {
    name: string;
    alt: string;
    file: any;
}

export class UserFileService extends BaseService<UserFileRequest, UserFile, string> {
    constructor() {
        super("User File Service", "user-file");
    }
}