import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTestimonialTable1605658705869 implements MigrationInterface {
    name = 'CreateTestimonialTable1605658705869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `testimonial` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `companyName` varchar(255) NOT NULL, `submitted` tinyint NOT NULL DEFAULT 0, `rating` int NULL, `testimonial` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `testimonial`");
    }

}
