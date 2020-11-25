import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Privileges} from "../constants/privileges.constants";

export type CleanedUser = Pick<User, "id" | "firstName" | "lastName" | "email" | "privileges">;

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({type: "bool", default: true})
    public active: boolean;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({type: "simple-array"})
    public privileges: string[];

    @Column({type: "bool", default: false})
    public verified: boolean;

    public cleaned(): CleanedUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            privileges: this.privileges,
        }
    }
}