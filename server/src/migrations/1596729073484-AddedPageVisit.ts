import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPageVisit1596729073484 implements MigrationInterface {
    name = 'AddedPageVisit1596729073484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `page_visit` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ip` varchar(255) NOT NULL, `page` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `page_visit`");
    }

}
