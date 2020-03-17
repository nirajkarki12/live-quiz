import {MigrationInterface, QueryRunner} from "typeorm";

export class sponserTable1584443049029 implements MigrationInterface {
    name = 'sponserTable1584443049029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sponsors` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `logo` varchar(255) NOT NULL, `logo_url` varchar(255) NULL, `prize` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` ADD `sponsorId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_52c158a608620611799fd63a927`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `input` `input` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `userId` `userId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `questionId` `questionId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_87fcbfc378caa579d16a92d6c02`", undefined);
        await queryRunner.query("ALTER TABLE `questions` CHANGE `questionSetId` `questionSetId` int NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz` (`userId`, `questionId`)", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_52c158a608620611799fd63a927` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_87fcbfc378caa579d16a92d6c02` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` ADD CONSTRAINT `FK_391981d3e880bd8ff110d6cea15` FOREIGN KEY (`sponsorId`) REFERENCES `sponsors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question_sets` DROP FOREIGN KEY `FK_391981d3e880bd8ff110d6cea15`", undefined);
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_87fcbfc378caa579d16a92d6c02`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_52c158a608620611799fd63a927`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz`", undefined);
        await queryRunner.query("ALTER TABLE `questions` CHANGE `questionSetId` `questionSetId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_87fcbfc378caa579d16a92d6c02` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `questionId` `questionId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `input` `input` varchar(255) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz` (`userId`, `questionId`)", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_52c158a608620611799fd63a927` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` DROP COLUMN `sponsorId`", undefined);
        await queryRunner.query("DROP TABLE `sponsors`", undefined);
    }

}
