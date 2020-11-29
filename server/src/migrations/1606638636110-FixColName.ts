import {MigrationInterface, QueryRunner} from "typeorm";

export class FixColName1606638636110 implements MigrationInterface {
    name = 'FixColName1606638636110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post` CHANGE `deletedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_post` CHANGE `updatedAt` `deletedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
