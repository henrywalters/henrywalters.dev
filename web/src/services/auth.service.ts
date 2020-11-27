import BaseService, {ApiResponse, HashMap} from "@/services/base.service";
import Cookies from "js-cookie";
import {AuthEventBus, AuthEvents} from "@/events";

export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IChangePasswordRequest {
    password: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    privileges: string[];
}

export class AuthService extends BaseService<void, void, void> {
    constructor() {
        super("Auth Service");
    }

    public async login(data: ILoginRequest): Promise<ApiResponse<string, string>> {
        try {
            const response = (await this.http.post("auth/login", data)).data;
            if (response.success) {
                Cookies.set("jwt", response.result);
                AuthEventBus.trigger(AuthEvents.Login);
            }
            return response;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async logout() {
        Cookies.remove("jwt", {path: ""});
        AuthEventBus.trigger(AuthEvents.Logout);
    }

    public async register(data: IRegisterRequest): Promise<ApiResponse<void, HashMap<string>>> {
        try {
            return (await this.http.post("auth/register", data)).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async verify(challenge: string): Promise<ApiResponse<void, string>> {
        try {
            return (await this.http.post("auth/verify/" + challenge)).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async self(): Promise<ApiResponse<User, string>> {
        try {
            return (await this.http.get("/auth/self")).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async changePassword(data: IChangePasswordRequest): Promise<ApiResponse<void, HashMap<string>>> {
        try {
            return (await this.http.post('/auth/change-password', data)).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public static HasPrivilege(user: User, privilege: string) {
        for (const priv of user.privileges) {
            if (priv === privilege) return true;
        }
        return false;
    }
}