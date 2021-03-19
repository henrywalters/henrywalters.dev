import BaseService, { ApiResponse, HashMap } from './base.service';
import { ICategory } from './category.service';
import { MinimalUser } from './user.service';


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
    //author: User;
    publishedAt: Date;
    lastUpdate: Date;
    categories: ICategory[];
    allowedToEdit: MinimalUser[];
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

export interface CommentRequest {
    parentCommentId?: string;
    body: string;
    authorId?: string;
    authorName?: string;
    authorEmail?: string;
}

export interface Comment {
    id: string;
    parent?: Comment;
    children: Comment[];
    body: string;
    authorName: string;
}

export class BlogService extends BaseService<CreateBlogPostRequest | UpdateBlogPostRequest, BlogPostReadOnly | BlogPostFull | BlogPostListing, HashMap<string>> {
    constructor() {
        super("Blog Service", "blog");
    }

    public async getMine(): Promise<ApiResponse<BlogPostListing[], string>> {
        try {
            return (await this.client.get(this.controllerPath + "/mine"));
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async togglePublished(id: string | number) {
        try {
            return (await this.client.post(this.controllerPath + '/' + id + '/toggle-published', {}));
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async getComments(postId: string): Promise<ApiResponse<Comment[], string>> {
        try {
            return (await this.client.get(this.controllerPath + '/' + postId + '/comment'));
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async createComment(postId: string, req: CommentRequest) {
        try {
            return (await this.client.post(this.controllerPath + '/' + postId + '/comment', req));
        } catch (e) {
            throw new Error(e.message);
        }
    }
}