import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Testimonial extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

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

    @Column({type: 'text', nullable: true})
    public testimonial: string;
}