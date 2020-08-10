import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class TfaChallenge extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ManyToOne(type => User)
    public user: User;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({type: "datetime", nullable: true})
    public expiresAt?: Date;

    @Column({type: "bool", default: false})
    public passed: boolean;

    public isActive(): boolean {
        return !this.passed && (!this.expiresAt || this.expiresAt > new Date());
    }
}