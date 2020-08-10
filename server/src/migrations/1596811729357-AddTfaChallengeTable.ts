import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTfaChallengeTable1596811729357 implements MigrationInterface {
    name = 'AddTfaChallengeTable1596811729357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tfa_challenge` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `expiresAt` datetime NULL, `passed` tinyint NOT NULL DEFAULT 0, `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD `verified` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `tfa_challenge` ADD CONSTRAINT `FK_aa41b5420f96e62532f718d1297` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tfa_challenge` DROP FOREIGN KEY `FK_aa41b5420f96e62532f718d1297`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `verified`");
        await queryRunner.query("DROP TABLE `tfa_challenge`");
    }

}
