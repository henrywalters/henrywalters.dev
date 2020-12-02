import { ResponseDto } from "src/dtos/response.dto";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TrackedLink extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastViewAt: Date;

    @Column()
    public link: string;

    @Column()
    public source: string;

    @Column()
    public encodedSource: string;

    @Column({type: "int", default: 0})
    public views: number;

    @Column({type: "bool", default: false})
    public viewed: boolean;

    public static async findOneByLinkAndSource(link: string, source: string) {
        return TrackedLink.findOne({
            where: [
                {
                    link,
                    source,
                },
                {
                    link,
                    encodedSource: source,
                }
            ]
        })
    }

    public static async createLink(link: string, source: string) {
        if (await this.findOneByLinkAndSource(link, source)) {
            return ResponseDto.Error({source: "Link with this source already exists"});
        }

        const trackedLink = new TrackedLink();
        trackedLink.link = link;
        trackedLink.source = source;   
        trackedLink.encodedSource = Buffer.from(source).toString('base64');
        await trackedLink.save();

        return ResponseDto.Success(trackedLink);
    }
}