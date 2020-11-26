import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedServiceTable1606368437988 implements MigrationInterface {
    name = 'AddedServiceTable1606368437988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `service` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` text NOT NULL, `longDescription` mediumtext NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `service`");
    }

}
