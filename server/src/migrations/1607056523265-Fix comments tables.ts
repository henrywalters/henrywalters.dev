import {MigrationInterface, QueryRunner} from "typeorm";

export class FixCommentsTables1607056523265 implements MigrationInterface {
    name = 'FixCommentsTables1607056523265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` ADD `blogPostId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_ef03d5e0e2de13a5d99aa74b3c7` FOREIGN KEY (`blogPostId`) REFERENCES `blog_post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_ef03d5e0e2de13a5d99aa74b3c7`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `blogPostId`");
    }

}
