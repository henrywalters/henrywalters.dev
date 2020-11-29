import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBlogPostTable1606635910064 implements MigrationInterface {
    name = 'CreateBlogPostTable1606635910064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `blog_post` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `live` tinyint NOT NULL DEFAULT 0, `title` varchar(255) NOT NULL, `content` longtext NOT NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `blog_post_users_allowed_to_edit` (`blogPostId` varchar(36) NOT NULL, `userId` varchar(36) NOT NULL, INDEX `IDX_c8c5c3440a45fb9750d2ba1cee` (`blogPostId`), INDEX `IDX_89aadadcf645943c3d5b0f6ebb` (`userId`), PRIMARY KEY (`blogPostId`, `userId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `blog_post_categories` (`blogPostId` varchar(36) NOT NULL, `categoryId` int NOT NULL, INDEX `IDX_ea4ef51166dbe2f8db798fe988` (`blogPostId`), INDEX `IDX_435cbf292acb4f419f059b3efe` (`categoryId`), PRIMARY KEY (`blogPostId`, `categoryId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `blog_post` ADD CONSTRAINT `FK_657e11001f05ef48b5383f5a637` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `blog_post_users_allowed_to_edit` ADD CONSTRAINT `FK_c8c5c3440a45fb9750d2ba1cee0` FOREIGN KEY (`blogPostId`) REFERENCES `blog_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `blog_post_users_allowed_to_edit` ADD CONSTRAINT `FK_89aadadcf645943c3d5b0f6ebb2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `blog_post_categories` ADD CONSTRAINT `FK_ea4ef51166dbe2f8db798fe9885` FOREIGN KEY (`blogPostId`) REFERENCES `blog_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `blog_post_categories` ADD CONSTRAINT `FK_435cbf292acb4f419f059b3efea` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post_categories` DROP FOREIGN KEY `FK_435cbf292acb4f419f059b3efea`");
        await queryRunner.query("ALTER TABLE `blog_post_categories` DROP FOREIGN KEY `FK_ea4ef51166dbe2f8db798fe9885`");
        await queryRunner.query("ALTER TABLE `blog_post_users_allowed_to_edit` DROP FOREIGN KEY `FK_89aadadcf645943c3d5b0f6ebb2`");
        await queryRunner.query("ALTER TABLE `blog_post_users_allowed_to_edit` DROP FOREIGN KEY `FK_c8c5c3440a45fb9750d2ba1cee0`");
        await queryRunner.query("ALTER TABLE `blog_post` DROP FOREIGN KEY `FK_657e11001f05ef48b5383f5a637`");
        await queryRunner.query("DROP INDEX `IDX_435cbf292acb4f419f059b3efe` ON `blog_post_categories`");
        await queryRunner.query("DROP INDEX `IDX_ea4ef51166dbe2f8db798fe988` ON `blog_post_categories`");
        await queryRunner.query("DROP TABLE `blog_post_categories`");
        await queryRunner.query("DROP INDEX `IDX_89aadadcf645943c3d5b0f6ebb` ON `blog_post_users_allowed_to_edit`");
        await queryRunner.query("DROP INDEX `IDX_c8c5c3440a45fb9750d2ba1cee` ON `blog_post_users_allowed_to_edit`");
        await queryRunner.query("DROP TABLE `blog_post_users_allowed_to_edit`");
        await queryRunner.query("DROP TABLE `blog_post`");
    }

}
