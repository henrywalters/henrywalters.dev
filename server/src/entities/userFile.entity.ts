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
export class UserFile extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    @ManyToOne(type => User)
    @JoinColumn()
    public user: User;

    @Column()
    public name: string;

    @Column()
    public alt: string;

    @Column()
    public cdn: string;

    @Column()
    public cdnId: string;
}