import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Privileges} from "../constants/privileges.constants";

@Injectable()
export class AuthenticateFor implements CanActivate {

    private permissions: Privileges[];

    constructor(...permissions: Privileges[]) {
        this.permissions = permissions;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.user) return false;

        const permissionTable = {};

        for (const permission of request.headers.user.privileges) {
            permissionTable[permission] = true;
        }

        for (const permission of this.permissions) {
            if (!permissionTable[permission]) return false;
        }

        return true;
    }
}