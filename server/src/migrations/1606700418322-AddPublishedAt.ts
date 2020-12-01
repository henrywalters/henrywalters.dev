import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPublishedAt1606700418322 implements MigrationInterface {
    name = 'AddPublishedAt1606700418322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post` ADD `publishedAt` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post` DROP COLUMN `publishedAt`");
    }

}
