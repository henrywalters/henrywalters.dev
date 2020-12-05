import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentsToBlogPost1607055329778 implements MigrationInterface {
    name = 'AddCommentsToBlogPost1607055329778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `blog_post_comments` (`blogPostId` varchar(36) NOT NULL, `commentId` varchar(36) NOT NULL, INDEX `IDX_dfa4291d1a7f2dde6b77cc0fbf` (`blogPostId`), INDEX `IDX_8978632e6188bfd8f96f4b42e7` (`commentId`), PRIMARY KEY (`blogPostId`, `commentId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `blog_post_comments` ADD CONSTRAINT `FK_dfa4291d1a7f2dde6b77cc0fbf1` FOREIGN KEY (`blogPostId`) REFERENCES `blog_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `blog_post_comments` ADD CONSTRAINT `FK_8978632e6188bfd8f96f4b42e7b` FOREIGN KEY (`commentId`) REFERENCES `comment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post_comments` DROP FOREIGN KEY `FK_8978632e6188bfd8f96f4b42e7b`");
        await queryRunner.query("ALTER TABLE `blog_post_comments` DROP FOREIGN KEY `FK_dfa4291d1a7f2dde6b77cc0fbf1`");
        await queryRunner.query("DROP INDEX `IDX_8978632e6188bfd8f96f4b42e7` ON `blog_post_comments`");
        await queryRunner.query("DROP INDEX `IDX_dfa4291d1a7f2dde6b77cc0fbf` ON `blog_post_comments`");
        await queryRunner.query("DROP TABLE `blog_post_comments`");
    }

}
