import {MigrationInterface, QueryRunner} from "typeorm";

export class AddParentCommentID1597615354343 implements MigrationInterface {
    name = 'AddParentCommentID1597615354343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` ADD `parentCommentId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `authorId` `authorId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_1077d47e0112cad3c16bbcea6cd`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `post` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `post` CHANGE `authorId` `authorId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_73aac6035a70c5f0313c939f237` FOREIGN KEY (`parentCommentId`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_1077d47e0112cad3c16bbcea6cd`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_73aac6035a70c5f0313c939f237`");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` CHANGE `authorId` `authorId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `authorId` `authorId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `parentCommentId`");
    }

}
