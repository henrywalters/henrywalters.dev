import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserFile} from "./userFile.entity";

export enum ProjectStatus {
    IN_DEVELOPMENT = "In Development",
    LIVE = "Live",
    DEPRECATED = "Deprecated",
}

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column()
    public shortDescription: string;

    @Column({type: "text"})
    public longDescription: string;

    @Column({nullable: true})
    public url?: string;

    @Column({nullable: true})
    public sourceControlUrl?: string;

    @Column({nullable: true})
    public videoUrl?: string;

    @Column({type: "enum", enum: ProjectStatus})
    public status: ProjectStatus;

    @Column({type: "simple-array"})
    public languages: string[];

    @ManyToOne(type => UserFile, {nullable: true})
    @JoinColumn()
    public thumbnail?: UserFile;


}