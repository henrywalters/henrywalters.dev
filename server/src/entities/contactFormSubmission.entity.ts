import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ContactFormSubmission extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = "";

    @Column()
    public email: string;

    @Column()
    public companyName: string;

    @Column({type: 'text'})
    public comments: string;
}