import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeContactFormToText1606347105483 implements MigrationInterface {
    name = 'ChangeContactFormToText1606347105483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact_form_submission` DROP COLUMN `comments`");
        await queryRunner.query("ALTER TABLE `contact_form_submission` ADD `comments` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact_form_submission` DROP COLUMN `comments`");
        await queryRunner.query("ALTER TABLE `contact_form_submission` ADD `comments` varchar(255) NOT NULL");
    }

}
