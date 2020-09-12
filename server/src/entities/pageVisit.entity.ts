import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PageVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public timestamp: Date;

    @Column()
    public ip: string;

    @Column()
    public page: string;

    @Column()
    public country: string;

    @Column()
    public state: string;

    @Column()
    public city: string;
}