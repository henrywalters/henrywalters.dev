import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAnonToTestimonial1606178212450 implements MigrationInterface {
    name = 'AddAnonToTestimonial1606178212450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `page_type` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `live` tinyint NOT NULL DEFAULT 0, `showLink` tinyint NOT NULL DEFAULT 1, `showSubLinks` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `testimonial` ADD `anonymous` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `testimonial` DROP COLUMN `anonymous`");
        await queryRunner.query("DROP TABLE `page_type`");
    }

}
