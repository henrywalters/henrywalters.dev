import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { runInThisContext } from "vm";
import { Category } from "./category.entity";
import { CleanedUser, User } from "./user.entity";

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
    author: CleanedUser;
    publishedOn: Date;
    lastUpdate: Date;
    categories: Category[];
}

function extractImagePreviews(content: string): ImagePreview[] {
    const re = /!\[(.*?)\]\((.*?)\)/;
    return content.match(re).map(x => {
        return {
        src: x[2],
        alt: x[1]
        }
    });
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

    @ManyToOne(() => User)
    public author: User;

    @ManyToMany(() => User)
    @JoinTable({
        name: "blog_post_users_allowed_to_edit",
    })
    public allowedToEdit: User[];

    @ManyToMany(() => Category)
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
            slug: this.slug,
            title: this.title,
            preview: this.content.slice(0, 120),
            imagePreview: this.imagePreview,
        }
    }

    public readOnly(): BlogPostReadOnly {
        return {
            slug: this.slug,
            title: this.title,
            content: this.content,
            author: this.author.cleaned(),
            publishedOn: this.createdAt,
            lastUpdate: this.updatedAt,
            categories: this.categories,
        }
    }
}