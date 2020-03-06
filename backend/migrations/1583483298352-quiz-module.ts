import {MigrationInterface, QueryRunner} from "typeorm";

export class quizModule1583483298352 implements MigrationInterface {
    name = 'quizModule1583483298352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `quiz` (`id` int NOT NULL AUTO_INCREMENT, `input` varchar(255) NULL, `isCorrect` tinyint NOT NULL DEFAULT 0, `isTimeout` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `questionId` int NULL, UNIQUE INDEX `IDX_6860361162d8d20612c38480f5` (`userId`, `questionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `image` `image` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `userId` `userId` int NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_52c158a608620611799fd63a927` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_52c158a608620611799fd63a927`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `userId` `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `password` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `image` `image` varchar(255) NULL", undefined);
        await queryRunner.query("DROP INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz`", undefined);
        await queryRunner.query("DROP TABLE `quiz`", undefined);
    }

}
