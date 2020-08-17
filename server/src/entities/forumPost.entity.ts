import {
    BaseEntity,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "./category.entity";
import {User} from "./user.entity";

@Entity()
export class ForumPost extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    @Column()
    public title: string;

    @Column({type: "longtext"})
    public body: string;

    @ManyToOne(type => Category)
    public category: Category;

    @Column({type: "simple-array"})
    public tags: string[];

    @ManyToOne(type => User, {eager: true})
    public author: User;
}