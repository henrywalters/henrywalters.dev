import {MigrationInterface, QueryRunner} from "typeorm";

export class AddForumTables1597118145008 implements MigrationInterface {
    name = 'AddForumTables1597118145008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `category` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `body` longtext NOT NULL, `upvotes` int NOT NULL, `downvotes` int NOT NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `title` varchar(255) NOT NULL, `body` longtext NOT NULL, `tags` text NOT NULL, `categoryId` int NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL");
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
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` CHANGE `expiresAt` `expiresAt` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `post`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `category`");
    }

}
