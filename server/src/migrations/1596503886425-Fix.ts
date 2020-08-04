import {MigrationInterface, QueryRunner} from "typeorm";

export class Fix1596503886425 implements MigrationInterface {
    name = 'Fix1596503886425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `contact_form_submission` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `companyName` varchar(255) NOT NULL, `comments` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `contact_form_submission`");
    }

}
