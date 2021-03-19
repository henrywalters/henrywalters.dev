import { IUser } from 'hauth-lib/dist/interfaces/user';
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

export class UserService extends BaseService<UpdateUserRequest, MinimalUser | IUser, HashMap<string>> {
    constructor() {
        super("User Service", "user");
    }
}