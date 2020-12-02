import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTrackedLinkTable1606860445621 implements MigrationInterface {
    name = 'AddedTrackedLinkTable1606860445621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tracked_link` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastViewAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `link` varchar(255) NOT NULL, `source` varchar(255) NOT NULL, `encodedSource` varchar(255) NOT NULL, `views` int NOT NULL DEFAULT 0, `viewed` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `tracked_link`");
    }

}
