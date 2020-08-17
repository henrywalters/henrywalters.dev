import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePosttoForumPost1597627582355 implements MigrationInterface {
    name = 'ChangePosttoForumPost1597627582355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `forum_post` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `title` varchar(255) NOT NULL, `body` longtext NOT NULL, `tags` text NOT NULL, `categoryId` int NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_73aac6035a70c5f0313c939f237`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `parentCommentId` `parentCommentId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `authorId` `authorId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_73aac6035a70c5f0313c939f237` FOREIGN KEY (`parentCommentId`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `forum_post` ADD CONSTRAINT `FK_8bd965dd438fde106f7b14314a1` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `forum_post` ADD CONSTRAINT `FK_25a59022a9c95eb1016ad24e775` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `forum_post` DROP FOREIGN KEY `FK_25a59022a9c95eb1016ad24e775`");
        await queryRunner.query("ALTER TABLE `forum_post` DROP FOREIGN KEY `FK_8bd965dd438fde106f7b14314a1`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_73aac6035a70c5f0313c939f237`");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `authorId` `authorId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `parentCommentId` `parentCommentId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_73aac6035a70c5f0313c939f237` FOREIGN KEY (`parentCommentId`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP TABLE `forum_post`");
    }

}
