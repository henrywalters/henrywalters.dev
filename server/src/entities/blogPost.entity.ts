import { Res } from "@nestjs/common";
import { CreateBlogPostDto, UpdateBlogPostDto } from "src/dtos/blogPost.dto";
import { ResponseDto } from "src/dtos/response.dto";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { runInThisContext } from "vm";
import { Category } from "./category.entity";
import { CleanedUser, User } from "./user.entity";
import { UserFile } from "./userFile.entity";

export interface ImagePreview {
    src: string;
    alt: string;
}

export interface BlogPostListing {
    live: boolean;
    slug: string;
    title: string;
    preview: string;
    imagePreview?: ImagePreview;
}

export interface BlogPostReadOnly {
    live: boolean;
    slug: string;
    title: string;
    content: string;
    authorName: string;
    publishedAt: Date;
    lastUpdate: Date;
    categories: Category[];
}

export interface BlogPostFull {
    id: string;
    slug: string;
    title: string;
    content: string;
    author: CleanedUser;
    publishedAt: Date;
    lastUpdate: Date;
    categories: Category[];
    allowedToEdit: CleanedUser[];
}

const MD_IMG_RE = /!\[(.*?)\]\((.*?)\)/g;
const MD_IMG_ALT_RE = /!\[(.*?)\]/;
const MD_IMG_URL_RE = /\((.*?)\)/;

const MD_HEADER_RE = /#.*[\r|\n]/g;
const MD_NEW_LINE_RE = /[\r\n]/g;

const MD_PREVIEW_REMOVALS = [
    MD_IMG_RE,
    MD_HEADER_RE,
    MD_NEW_LINE_RE,
    "<br>",
]

const PREVIEW_LENGTH = 120;

function extractPreview(content: string): string {
    for (const removal of MD_PREVIEW_REMOVALS) {
        content = content.replace(removal, "");
    }
    return content.slice(0, PREVIEW_LENGTH);
}

function extractImagePreviews(content: string): ImagePreview[] {
    const matches = content.match(MD_IMG_RE);
    return !matches ? [] : matches.map(image => {
        return {
            src: image.match(MD_IMG_URL_RE)[1],
            alt: image.match(MD_IMG_ALT_RE)[1],
        }
    })
}

@Entity()
export class BlogPost extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public slug: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @Column({type: "bool", default: false})
    public live: boolean;

    @Column({type: "datetime", nullable: true})
    public publishedAt: Date;

    @ManyToOne(() => User, {eager: true})
    public author: User;

    @ManyToMany(() => User, {eager: true})
    @JoinTable({
        name: "blog_post_users_allowed_to_edit",
    })
    public allowedToEdit: User[];

    @ManyToMany(() => Category, {eager: true})
    @JoinTable({
        name: "blog_post_categories"
    })
    public categories: Category[];

    @Column()
    public title: string;

    @Column({type: "longtext"})
    public content: string;

    public get imagePreview(): ImagePreview | undefined {
        const previews = extractImagePreviews(this.content);
        return previews.length > 0 ? previews[0] : void 0;
    }

    public cleaned(): BlogPostListing {
        return {
            live: this.live,
            slug: this.slug,
            title: this.title,
            preview: extractPreview(this.content),
            imagePreview: this.imagePreview,
        }
    }

    public readOnly(): BlogPostReadOnly {
        return {
            live: this.live,
            slug: this.slug,
            title: this.title,
            content: this.content,
            authorName: this.author.fullName,
            publishedAt: this.publishedAt,
            lastUpdate: this.updatedAt,
            categories: this.categories,
        }
    }

    public static async createFromRequest(author: User, req: CreateBlogPostDto) {
        if (await this.findBySlug(req.slug)) {
            return ResponseDto.Error({slug: 'Blog post with this slug already exists'})
        }

        const post = new BlogPost();
        post.author = author;
        post.slug = req.slug;
        post.title = req.title;
        post.content = "";
        post.categories = [];
        post.allowedToEdit = [];
        await post.save();

        return ResponseDto.Success(post.readOnly());
    }

    public async updateFromRequest(req: UpdateBlogPostDto) {
        const otherPost = await BlogPost.findBySlug(req.slug);
        if (otherPost && otherPost.id !== this.id) {
            return ResponseDto.Error({slug: 'Blog post with this slug already exists'})
        }

        this.slug = req.slug;
        this.title = req.title;
        this.content = req.content;
        this.allowedToEdit = await User.findByIds(req.usersAllowedToEditIds);
        this.categories = await Category.findByIds(req.categoryIds);
        await this.save();

        return ResponseDto.Success(this.readOnly());
    }

    public async canEdit(user: User | CleanedUser): Promise<boolean> {
        return this.author.id === user.id || this.allowedToEdit.filter(x => x.id === user.id).length > 0;
    }

    public static async findBySlug(slug: string): Promise<BlogPost> {
        return await BlogPost.findOne({
            where: {
                slug,
            }
        })
    }

    public static async findByIdOrSlug(idOrSlug: string): Promise<BlogPost> {
        return await BlogPost.findOneOrFail({
            where: [
                { id: idOrSlug },
                { slug: idOrSlug },
            ]
        });
    }
}