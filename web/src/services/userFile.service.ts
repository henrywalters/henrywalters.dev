import {User} from "@/services/auth.service";


export interface UserFile {
    id: string;
    user: User;
    name: string;
    alt: string;
    cdn: string;
    cdnId: string;
}