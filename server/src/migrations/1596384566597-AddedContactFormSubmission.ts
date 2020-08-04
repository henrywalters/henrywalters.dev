import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedContactFormSubmission1596384566597 implements MigrationInterface {
    name = 'AddedContactFormSubmission1596384566597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `contact_form_submission_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `companyName` varchar(255) NOT NULL, `comments` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `contact_form_submission_entity`");
    }

}
