import { User } from './auth.service';
import BaseService, { HashMap } from './base.service';

export interface MinimalUser {
    id: string;
    firstName: string;
    lastName: string;
}

export interface UpdateUserRequest {
    active: boolean;
    privileges: string[];
}

export class UserService extends BaseService<UpdateUserRequest, MinimalUser | User, HashMap<string>> {
    constructor() {
        super("User Service", "user");
    }
}