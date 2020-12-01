import { User } from './auth.service';
import BaseService, { HashMap } from './base.service';
import { ICategory } from './category.service';


export interface ImagePreview {
    src: string;
    alt: string;
}

export interface BlogPostListing {
    slug: string;
    title: string;
    preview: string;
    imagePreview?: ImagePreview;
}

export interface BlogPostReadOnly {
    slug: string;
    title: string;
    content: string;
    authorName: string;
    publishedAt: Date;
    lastUpdate: Date;
    categories: ICategory[];
}

export interface BlogPostFull {
    id: string;
    slug: string;
    title: string;
    content: string;
    author: User;
    publishedAt: Date;
    lastUpdate: Date;
    categories: ICategory[];
    allowedToEdit: User[];
}

export interface CreateBlogPostRequest {
    title: string;
    slug: string;
}

export interface UpdateBlogPostRequest {
    title: string;
    slug: string;
    content: string;
    usersAllowedToEditIds: string[];
    categoryIds: string[];
}

export class BlogService extends BaseService<CreateBlogPostRequest | UpdateBlogPostRequest, BlogPostReadOnly | BlogPostFull | BlogPostListing, HashMap<string>> {
    constructor() {
        super("Blog Service", "blog");
    }

    public async getMine() {
        try {
            return (await this.http.get(this.controllerPath + "/mine")).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async togglePublished(id: string | number) {
        try {
            return (await this.http.post(this.controllerPath + '/' + id + '/toggle-published')).data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}