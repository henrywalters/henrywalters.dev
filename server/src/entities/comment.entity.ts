import {
    BaseEntity, Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToMany, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";
import {ForumPost} from "./forumPost.entity";
import { BlogPost } from "./blogPost.entity";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    @ManyToOne(type => Comment)
    @JoinColumn()
    public parentComment: Comment;

    @Column({type: "longtext"})
    public body: string;

    @ManyToOne(type => User, {nullable: true, eager: true})
    public author: User;

    @Column({nullable: true})
    public authorName: string;

    @Column({nullable: true})
    public authorEmail: string;

    @ManyToOne(() => BlogPost, post => post.comments, {nullable: true})
    public blogPost: BlogPost;

    public cleaned() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            parentComment: this.parentComment ? this.parentComment.cleaned() : void 0,
            body: this.body,
            authorName: this.author ? this.author.fullName : this.authorName,
        }
    }

    public static async createUserComment(post: BlogPost, user: User, body: string, parentComment?: Comment) {
        const comment = new Comment();
        comment.author = user;
        comment.body = body;
        comment.blogPost = post;
        if (parentComment) {
            comment.parentComment = parentComment;
        }
        await comment.save();
        return comment;
    }

    public static async createGuestComment(post: BlogPost, authorName: string, authorEmail: string, body: string, parentComment?: Comment) {
        const comment = new Comment();
        comment.authorName = authorName;
        comment.authorEmail = authorEmail;
        comment.body = body;
        comment.blogPost = post;
        if (parentComment) {
            comment.parentComment = parentComment;
        }
        await comment.save();
        return comment;
    }
}