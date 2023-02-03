import { UserEntity } from "../../Entity/UserEntity";

export interface IUserService {
    getAll(): Promise<UserEntity[]>;
    getById(id: number): Promise<UserEntity | undefined>;
    create(entity: UserEntity): Promise<UserEntity>;
    update(entity: UserEntity): Promise<UserEntity>;
    delete(id: number): Promise<any>;
}