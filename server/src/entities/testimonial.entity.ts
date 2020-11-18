import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Testimonial extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public companyName: string;

    @Column({type: "boolean", default: false})
    public submitted: boolean;

    @Column({type: "int", nullable: true})
    public rating: number;

    @Column({nullable: true})
    public testimonial: string;
}