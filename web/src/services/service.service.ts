import BaseService, { HashMap } from './base.service';

export interface IService {
    id: string;
    slug: string;
    icon: string;
    name: string;
    description: string;
    longDescription: string;
}

export default class ServiceService extends BaseService<IService, IService, HashMap<string>> {
    constructor() {
        super("ServiceService", "service");
    }
}