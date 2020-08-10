import {AxiosInstance} from "axios";
const axios = require("axios").default;
import Cookies from "js-cookie";

export type HashMap<V> = { [key: string]: V};

export type Success<S> = { success: true, result: S };
export type Error<E> = { success: false, error: E };
export type ApiResponse<S, E> = Success<S> | Error<E>;

// Service that excepts dto T and returns reply R with possible error E.
export default class BaseService<T, R, E> {
    protected http: AxiosInstance;
    protected name: string;

    constructor(name: string) {
        this.name = name;
        this.http = axios.create({
            baseURL: process.env.VUE_APP_API_ROOT,
        });

        if (Cookies.get("jwt")) {
            this.http.defaults.headers.common["jwt"] = "Bearer " + Cookies.get("jwt");
        }
    }

    private undefinedErrorMessage(method: string): string {
        return `${method} not defined on ${this.name}. You must define this virtual method in that class before using this call.`;
    }

    public async get(): Promise<ApiResponse<R[], E>> {
        throw new Error(this.undefinedErrorMessage("GET"));
    }

    public async getOne(id: string | number): Promise<ApiResponse<R, E>> {
        throw new Error(this.undefinedErrorMessage("GET ONE"));
    }

    public async post(data: T): Promise<ApiResponse<R, E>> {
        throw new Error(this.undefinedErrorMessage("POST"));
    }

    public async put(id: string | number, data: T): Promise<ApiResponse<R, E>> {
        throw new Error(this.undefinedErrorMessage("PUT"));
    }

    public async delete(id: string | number): Promise<ApiResponse<void, E>> {
        throw new Error(this.undefinedErrorMessage("DELETE"));
    }
}