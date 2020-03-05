import {MigrationInterface, QueryRunner} from "typeorm";

export class quizModule1583410955656 implements MigrationInterface {
    name = 'quizModule1583410955656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `quiz` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `questionId` int NULL, `questionSetId` int NULL, UNIQUE INDEX `IDX_c3211c84a0a98c717ab76cb349` (`questionId`, `questionSetId`), UNIQUE INDEX `REL_198668543e71c448396d06ffb0` (`questionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `quiz_input` (`id` int NOT NULL AUTO_INCREMENT, `input` varchar(255) NOT NULL, `isCorrect` tinyint NOT NULL, `isTimeout` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `quizId` int NULL, UNIQUE INDEX `IDX_ca571e69b5b820da5832aa782d` (`userId`, `quizId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `image` `image` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `userId` `userId` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_13c124d242fad8b14178b023d27` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz_input` ADD CONSTRAINT `FK_e539882703128151d9f8c6c8e11` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz_input` ADD CONSTRAINT `FK_b8cfe26483f108d3207c66ac5d8` FOREIGN KEY (`quizId`) REFERENCES `quiz`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `quiz_input` DROP FOREIGN KEY `FK_b8cfe26483f108d3207c66ac5d8`", undefined);
        await queryRunner.query("ALTER TABLE `quiz_input` DROP FOREIGN KEY `FK_e539882703128151d9f8c6c8e11`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_13c124d242fad8b14178b023d27`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `userId` `userId` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `image` `image` varchar(255) NULL", undefined);
        await queryRunner.query("DROP INDEX `IDX_ca571e69b5b820da5832aa782d` ON `quiz_input`", undefined);
        await queryRunner.query("DROP TABLE `quiz_input`", undefined);
        await queryRunner.query("DROP INDEX `REL_198668543e71c448396d06ffb0` ON `quiz`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c3211c84a0a98c717ab76cb349` ON `quiz`", undefined);
        await queryRunner.query("DROP TABLE `quiz`", undefined);
    }

}
