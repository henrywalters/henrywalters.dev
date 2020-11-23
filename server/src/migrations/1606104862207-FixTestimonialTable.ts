import {MigrationInterface, QueryRunner} from "typeorm";

export class FixTestimonialTable1606104862207 implements MigrationInterface {
    name = 'FixTestimonialTable1606104862207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `testimonial` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `testimonial` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `testimonial` DROP COLUMN `testimonial`");
        await queryRunner.query("ALTER TABLE `testimonial` ADD `testimonial` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `testimonial` DROP COLUMN `testimonial`");
        await queryRunner.query("ALTER TABLE `testimonial` ADD `testimonial` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `testimonial` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `testimonial` DROP COLUMN `createdAt`");
    }

}
