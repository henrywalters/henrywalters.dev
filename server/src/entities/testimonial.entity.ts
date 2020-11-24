import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

export type AnonymousTestimonial = Pick<Testimonial, 'rating' | 'testimonial'>;
export type CleanedTestimonial = Pick<Testimonial, 'name' | 'companyName' | 'rating' | 'testimonial'>;

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
    public anonymous: boolean;

    @Column({type: "boolean", default: false})
    public submitted: boolean;

    @Column({type: "int", nullable: true})
    public rating: number;

    @Column({type: 'text', nullable: true})
    public testimonial: string;
}