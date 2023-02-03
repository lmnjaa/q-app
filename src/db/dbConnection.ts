import "reflect-metadata"
import { DataSource } from "typeorm"
import { BookEntity } from "../entity/BookEntity";
import { UserEntity } from "../entity/UserEntity";

export const AppDataSource = new DataSource({
    synchronize: true,
    type: "mysql",
    host: process.env.MYSQL_HOST ?? "localhost",
    port: parseInt(process.env.MYSQL_PORT) ?? 3306,
    username: process.env.MYSQL_USERNAME ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "password",
    database: process.env.MYSQL_DATABASE ?? "q-app",
    entities: [BookEntity, UserEntity]
});

export const initDbConnection = () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('[DATABASE] Database connection successfully.');
        })
        .catch((error) => {
            console.log('[DATABASE] Error while connection to DB. | Error : ', error);
        })
}