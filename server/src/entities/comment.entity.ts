import {
    BaseEntity, Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";

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

    @Column({type: "integer"})
    public upvotes;

    @Column({type: "integer"})
    public downvotes;

    @ManyToOne(type => User)
    public author: User;
}