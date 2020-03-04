import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1583305677420 implements MigrationInterface {
    name = 'Users1583305677420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `image` varchar(255) NULL DEFAULT NULL, `password` varchar(255) NULL DEFAULT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, `userId` varchar(255) NULL DEFAULT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
