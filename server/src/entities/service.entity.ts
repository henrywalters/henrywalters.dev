import { ServiceDTO } from "src/dtos/service.dto";
import {ResponseDto} from "src/dtos/response.dto";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type MinimalService = Pick<Service, 'id' | 'slug' | 'icon' | 'name' | 'description'>;

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public slug: string;

    @Column()
    public icon: string;

    @Column()
    public name: string;

    @Column({type: 'text'})
    public description: string;

    @Column({type: "mediumtext"})
    public longDescription: string;

    public async updateFromDTO(dto: ServiceDTO) {
        const existingService = await Service.findBySlug(dto.slug);
        if (existingService && existingService.id != this.id) {
            return ResponseDto.Error({'slug': 'Slug already exists'});
        }
        this.slug = dto.slug;
        this.icon = dto.icon;
        this.name = dto.name;
        this.description = dto.description;
        this.longDescription = dto.longDescription;
        await this.save();
        return ResponseDto.Success(this);
    }

    public cleaned(): MinimalService {
        return {
            id: this.id,
            slug: this.slug,
            icon: this.icon,
            name: this.name,
            description: this.description,
        }
    }

    public static async findBySlug(slug: string): Promise<Service> {
        return await Service.findOne({
            where: {
                slug,
            }
        })
    }

    public static async findByIdOrSlug(idOrSlug: string): Promise<Service> {
        return await Service.findOneOrFail({
            where: [
                {
                    id: idOrSlug,
                },
                {
                    slug: idOrSlug,
                }
            ]
        });
    }
}