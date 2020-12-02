import BaseService, { HashMap } from './base.service';

export interface TrackedLinkRequest {
    link: string;
    source: string;
}

export interface TrackedLink {
    id: string;
    createdAt: Date;
    lastViewAt: Date;
    link: string;
    source: string;
    encodedSource: string;
    views: number;
    viewed: boolean;
}

export class TrackedLinkService extends BaseService<TrackedLinkRequest, TrackedLink, HashMap<string>> {
    constructor() {
        super("Tracked File Service", "tracked-link");
    }
}