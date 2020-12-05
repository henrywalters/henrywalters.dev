import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCommentTable1607055105094 implements MigrationInterface {
    name = 'UpdateCommentTable1607055105094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_f1620c3cf7dde962e8fdfdd6350`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `upvotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `downvotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `forumPostId`");
        await queryRunner.query("ALTER TABLE `comment` ADD `authorName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD `authorEmail` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `authorEmail`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `authorName`");
        await queryRunner.query("ALTER TABLE `comment` ADD `forumPostId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD `downvotes` int NOT NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD `upvotes` int NOT NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_f1620c3cf7dde962e8fdfdd6350` FOREIGN KEY (`forumPostId`) REFERENCES `forum_post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
