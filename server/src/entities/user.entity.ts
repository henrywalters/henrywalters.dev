import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Privileges} from "../constants/privileges.constants";

export type CleanedUser = Pick<User, "id" | "firstName" | "lastName" | "email" | "privileges">;
export type MinimalUser = Pick<User, "id" | "firstName" | "lastName">;

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

    @Column({select: false})
    public password: string;

    @Column({type: "simple-array"})
    public privileges: string[];

    @Column({type: "bool", default: false, select: false})
    public verified: boolean;

    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }

    public hasPrivilege(privilege: Privileges): boolean {
        return this.privileges.indexOf(privilege) !== -1;
    }

    public static async getActive() {
        return await User.find({where: {active: true}});
    }

    public static async findOneByEmail(email: string) {
        return await this.getRepository()
            .createQueryBuilder('user')
            .addSelect('user.password')
            .addSelect('user.verified')
            .where('email = :email', {email})
            .andWhere('active = true')
            .getOne();
    }

    public minimal(): MinimalUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
        };
    }

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