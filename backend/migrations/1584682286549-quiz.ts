import {MigrationInterface, QueryRunner} from "typeorm";

export class quiz1584682286549 implements MigrationInterface {
    name = 'quiz1584682286549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sponsors_question_sets` (`questionSetsId` int NOT NULL, `sponsorsId` int NOT NULL, INDEX `IDX_15548817a3c3bb6611ce7b96b9` (`questionSetsId`), INDEX `IDX_24e071758af9afba3a639eff6d` (`sponsorsId`), PRIMARY KEY (`questionSetsId`, `sponsorsId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` ADD `isRoomOpen` tinyint NOT NULL DEFAULT 1", undefined);
        await queryRunner.query("ALTER TABLE `sponsors_question_sets` ADD CONSTRAINT `FK_15548817a3c3bb6611ce7b96b91` FOREIGN KEY (`questionSetsId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `sponsors_question_sets` ADD CONSTRAINT `FK_24e071758af9afba3a639eff6de` FOREIGN KEY (`sponsorsId`) REFERENCES `sponsors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sponsors_question_sets` DROP FOREIGN KEY `FK_24e071758af9afba3a639eff6de`", undefined);
        await queryRunner.query("ALTER TABLE `sponsors_question_sets` DROP FOREIGN KEY `FK_15548817a3c3bb6611ce7b96b91`", undefined);
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_87fcbfc378caa579d16a92d6c02`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_198668543e71c448396d06ffb0d`", undefined);
        await queryRunner.query("ALTER TABLE `quiz` DROP FOREIGN KEY `FK_52c158a608620611799fd63a927`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz`", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` DROP COLUMN `isRoomOpen`", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` ADD `isRoomOpen` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `questions` CHANGE `questionSetId` `questionSetId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_87fcbfc378caa579d16a92d6c02` FOREIGN KEY (`questionSetId`) REFERENCES `question_sets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `questionId` `questionId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `quiz` CHANGE `input` `input` varchar(255) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_6860361162d8d20612c38480f5` ON `quiz` (`userId`, `questionId`)", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_198668543e71c448396d06ffb0d` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE", undefined);
        await queryRunner.query("ALTER TABLE `quiz` ADD CONSTRAINT `FK_52c158a608620611799fd63a927` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP INDEX `IDX_24e071758af9afba3a639eff6d` ON `sponsors_question_sets`", undefined);
        await queryRunner.query("DROP INDEX `IDX_15548817a3c3bb6611ce7b96b9` ON `sponsors_question_sets`", undefined);
        await queryRunner.query("DROP TABLE `sponsors_question_sets`", undefined);
        await queryRunner.query("ALTER TABLE `question_sets` CHANGE `isRoomOpen` `sponsorId` int NULL DEFAULT 'NULL'", undefined);
    }

}
