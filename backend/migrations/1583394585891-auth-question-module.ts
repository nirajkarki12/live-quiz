import {MigrationInterface, QueryRunner} from "typeorm";

export class authQuestionModule1583394585891 implements MigrationInterface {
    name = 'authQuestionModule1583394585891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `questions` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `option1` varchar(255) NOT NULL, `option2` varchar(255) NOT NULL, `option3` varchar(255) NOT NULL, `option4` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `level` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `questionSetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question_sets` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `scheduleDate` datetime NOT NULL, `isCompleted` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe9a3c28a9b7e8da58a9af35f7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `image` varchar(255) NULL DEFAULT NULL, `password` varchar(255) NULL DEFAULT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, `userId` varchar(255) NULL DEFAULT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_87fcbfc378caa579d16a92d6c02` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_87fcbfc378caa579d16a92d6c02`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe9a3c28a9b7e8da58a9af35f7` ON `question_sets`", undefined);
        await queryRunner.query("DROP TABLE `question_sets`", undefined);
        await queryRunner.query("DROP TABLE `questions`", undefined);
    }

}
