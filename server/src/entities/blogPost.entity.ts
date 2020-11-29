import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { User } from "./user.entity";

@Entity()
export class BlogPost extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public slug: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public deletedAt: Date;

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
}