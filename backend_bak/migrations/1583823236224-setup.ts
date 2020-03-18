import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1583823236224 implements MigrationInterface {
    name = 'setup1583823236224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `image` varchar(255) NULL DEFAULT NULL, `password` varchar(255) NULL DEFAULT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, `userId` int NULL DEFAULT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_d72ea127f30e21753c9e229891` (`userId`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `quiz` (`id` int NOT NULL AUTO_INCREMENT, `input` varchar(255) NULL, `inputTime` int NOT NULL DEFAULT 0, `isCorrect` tinyint NOT NULL DEFAULT 0, `isTimeout` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `questionId` int NULL, UNIQUE INDEX `IDX_6860361162d8d20612c38480f5` (`userId`, `questionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `questions` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `option1` varchar(255) NOT NULL, `option2` varchar(255) NOT NULL, `option3` varchar(255) NOT NULL, `option4` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `level` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `questionSetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question_sets` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `scheduleDate` datetime NOT NULL, `isCompleted` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe9a3c28a9b7e8da58a9af35f7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_52c158a608620611799fd63a927` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_87fcbfc378caa579d16a92d6c02` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_87fcbfc378caa579d16a92d6c02`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_52c158a608620611799fd63a927`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe9a3c28a9b7e8da58a9af35f7` ON `question_sets`", undefined);
        await queryRunner.query("DROP TABLE `question_sets`", undefined);
        await queryRunner.query("DROP TABLE `questions`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz`", undefined);
        await queryRunner.query("DROP TABLE `quiz`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d72ea127f30e21753c9e229891` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
