import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

export type AnonymousTestimonial = Pick<Testimonial, 'anonymous' | 'submitted' | 'rating' | 'testimonial'>;
export type CleanedTestimonial = Pick<Testimonial, 'anonymous' | 'submitted' |  'name' | 'companyName' | 'rating' | 'testimonial'>;

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

    public makeAnonymous(): AnonymousTestimonial {
        return {
            anonymous: this.anonymous,
            submitted: this.submitted,
            rating: this.rating,
            testimonial: this.testimonial,
        }
    }

    public makeCleaned(): CleanedTestimonial {
        return {
            anonymous: this.anonymous,
            submitted: this.submitted,
            name: this.name,
            companyName: this.companyName,
            rating: this.rating,
            testimonial: this.testimonial,
        }
    }
}