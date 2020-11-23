import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PageType extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    // The url of the page type
    @Column()
    public slug: string;

    // Should the page type be active on the site
    @Column({type: "bool", default: true})
    public active: boolean;

    // Should the page be active on the live side (overridden by active)
    @Column({type: "bool", default: false})
    public live: boolean;

    // Show the page type link in the nav bar
    @Column({type: "bool", default: true})
    public showLink: boolean;

    // Should individual pages be shown in the nav bar
    @Column({type: "bool", default: false})
    public showSubLinks: boolean;
}