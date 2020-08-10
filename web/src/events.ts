import {Vue} from "vue-property-decorator";

export type EventHandler<T> = (payload: T) => void;

export interface EventListener<C, T> {
    id: number;
    active: boolean;
    event: C;
    handler: EventHandler<T>;
    bus: EventBus<C, T>
}

class EventBus<C, T> {
    private instance: Vue;

    private listeners: EventListener<C, T>[];

    constructor() {
        this.instance = new Vue();
        this.listeners = [];
    }

    public trigger(event: C, payload: T): void {
        for (const listener of this.listeners) {
            if (listener.active && listener.event === event) listener.handler(payload);
        }
    }

    public on(event: C, handler: EventHandler<T>): EventListener<C, T> {
        const listener: EventListener<C, T> = {
            id: this.listeners.length,
            active: true,
            event,
            handler,
            bus: this,
        };
        this.listeners.push(listener);
        return listener;
    }

    public removeById(id: number) {
        if (id >= 0 && id < this.listeners.length) {
            this.listeners[id].active = false;
        }
    }

    public remove(listener: EventListener<C, T>) {
        this.removeById(listener.id);
    }
}

export enum AuthEvents {
    Login = "LOGIN",
    Logout = "LOGOUT",
}

export const AuthEventBus = new EventBus<AuthEvents, void>();